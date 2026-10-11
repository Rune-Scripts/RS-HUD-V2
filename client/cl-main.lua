local function ResolveValue(key, ped, coords)
    if key == 'gametime' then -- 
        return string.format("%02d:%02d", GetClockHours(), GetClockMinutes())

    elseif key == 'streetname' then -- need opti [use ~3% cpu time ]
        local streetHash, crossingHash = GetStreetNameAtCoord(coords.x, coords.y, coords.z)
        local street = GetStreetNameFromHashKey(streetHash or 0)
        if street == nil or street == "" then
            return "Unknown Street"
        end
        return street

    elseif key == 'zonename' then
        local zone = GetLabelText(GetNameOfZone(coords.x, coords.y, coords.z))
        if zone == nil or zone == "" or zone == "NULL" then
            return "Unknown Zone"
        end
        return zone

    elseif key == 'serverid' then
        return string.format("ID#%02d", GetPlayerServerId(PlayerId()))
    end

    return ""
end

function HexToRGB(hex)
    hex = hex:gsub("#","")
    return tonumber(hex:sub(1,2), 16), tonumber(hex:sub(3,4), 16), tonumber(hex:sub(5,6), 16)
end

local function isHexColor(value)
    return type(value) == "string" and value:match("^#%x%x%x%x%x%x$") ~= nil
end

local function getHudLocale()
    local localeName = Config.Locales
    if type(localeName) ~= "string" or not localeName:match("^%w+$") then
        localeName = "en"
    end

    local localeFile = LoadResourceFile(GetCurrentResourceName(), "web/locals/" .. localeName .. ".json")
    if localeFile then
        local success, locale = pcall(json.decode, localeFile)
        if success and type(locale) == "table" then
            return locale
        end
        print(("^1[rs-hud] Error loading local '%s'. The script will use EN.^7"):format(localeName))
    else
        print(("^1[rs-hud] Error loading local '%s'. The script will use EN.^7"):format(localeName))
    end

    if localeName ~= "en" then
        local fallbackFile = LoadResourceFile(GetCurrentResourceName(), "web/locals/en.json")
        if fallbackFile then
            local success, locale = pcall(json.decode, fallbackFile)
            if success and type(locale) == "table" then return locale end
        end
    end
    return {}
end

local applyHudColors

local hudColors = {
    Primary = Config.Colors.Primary,
    Secondary = Config.Colors.Secondary,
    Bars = {}
}

local storedHudColors = GetResourceKvpString("hudColors")
if storedHudColors then
    local success, decoded = pcall(json.decode, storedHudColors)
    if success and type(decoded) == "table" then
        if isHexColor(decoded.Primary) then hudColors.Primary = decoded.Primary end
        if isHexColor(decoded.Secondary) then hudColors.Secondary = decoded.Secondary end
        if type(decoded.Bars) == "table" then hudColors.Bars = decoded.Bars end
    else
        print("^1[rs-hud] Les couleurs HUD sauvegardees sont invalides.^7")
    end
end

function GetMapPosition()
    local minimap = {}
    local resX, resY = GetActiveScreenResolution()
    local aspectRatio = GetAspectRatio()
    local scaleX = 1 / resX
    local scaleY = 1 / resY
    local minimapRawX, minimapRawY

    SetScriptGfxAlign(string.byte('L'), string.byte('B'))
    if IsBigmapActive() then
        minimapRawX, minimapRawY = GetScriptGfxPosition(-0.003975, 0.022 + (-0.460416666))
        minimap.width = scaleX * (resX / (2.52 * aspectRatio))
        minimap.height = scaleY * (resY / 2.3374)
    else
        minimapRawX, minimapRawY = GetScriptGfxPosition(-0.0045, 0.002 + (-0.188888))
        minimap.width = scaleX * (resX / (4 * aspectRatio))
        minimap.height = scaleY * (resY / 5.674)
    end
    ResetScriptGfxAlign()
    minimap.leftX = minimapRawX
    minimap.topY = minimapRawY
    return minimap
end

local function refreshMapPosition()
    Wait(100)
    local mapPos = GetMapPosition()

    SendNUIMessage({
        action = "updateMinimap",
        left = mapPos.leftX,
        top = mapPos.topY,
        width = mapPos.width,
        height = mapPos.height,
        isBigmap = IsBigmapActive(),
        colormap = hudColors
    })
end

RegisterCommand("refreshhud", function()
    refreshMapPosition()
end, false)

AddEventHandler("onClientResourceStart", function(resourceName)
    if GetCurrentResourceName() ~= resourceName then return end
    Wait(1000)
    RequestStreamedTextureDict("squaremap", false)
    while not HasStreamedTextureDictLoaded("squaremap") do
        Wait(100)
    end

    AddReplaceTexture("platform:/textures/graphics", "radarmasksm", "squaremap", "radarmasksm")
    AddReplaceTexture("platform:/textures/graphics", "radarmasklg", "squaremap", "radarmasklg")

    applyHudColors()
end)

local cachedServerId = nil
local lastStreetHash = nil
local cachedStreet = ""
local lastZoneCode = nil
local cachedZone = ""
local lastHour, lastMin = -1, -1
local cachedTime = ""

local function ResolveValueCached(key, ped, coords)
    if key == 'gametime' then
        local h, m = GetClockHours(), GetClockMinutes()
        if h ~= lastHour or m ~= lastMin then
            lastHour, lastMin = h, m
            cachedTime = string.format("%02d:%02d", h, m)
        end
        return cachedTime

    elseif key == 'streetname' then
        local streetHash = GetStreetNameAtCoord(coords.x, coords.y, coords.z)
        if streetHash ~= lastStreetHash then
            lastStreetHash = streetHash
            local street = GetStreetNameFromHashKey(streetHash or 0)
            cachedStreet = (street == nil or street == "") and "Unknown Street" or street
        end
        return cachedStreet

    elseif key == 'zonename' then
        local zoneCode = GetNameOfZone(coords.x, coords.y, coords.z)
        if zoneCode ~= lastZoneCode then
            lastZoneCode = zoneCode
            local zone = GetLabelText(zoneCode)
            cachedZone = (zone == nil or zone == "" or zone == "NULL") and "Unknown Zone" or zone
        end
        return cachedZone

    elseif key == 'serverid' then
        if not cachedServerId then
            cachedServerId = string.format("ID#%02d", GetPlayerServerId(PlayerId()))
        end
        return cachedServerId
    end

    return ""
end

local lastWaypointCoords = nil
local cachedWaypointStreet = ""

local function GetWaypointData(pedCoords)
    if not IsWaypointActive() then
        if lastWaypointCoords ~= nil then
            lastWaypointCoords = nil
            cachedWaypointStreet = ""
        end
        return nil, ""
    end

    local waypointBlip = GetFirstBlipInfoId(8)
    if DoesBlipExist(waypointBlip) then
        local waypointCoords = GetBlipInfoIdCoord(waypointBlip)
        if not lastWaypointCoords or #(lastWaypointCoords - waypointCoords) > 1.0 then
            lastWaypointCoords = waypointCoords
            local streetHash = GetStreetNameAtCoord(waypointCoords.x, waypointCoords.y, waypointCoords.z)
            local streetName = GetStreetNameFromHashKey(streetHash or 0)
            cachedWaypointStreet = (streetName == nil or streetName == "") and "Inconnue" or streetName
        end

        local distance = #(pedCoords - waypointCoords)
        return math.floor(distance), cachedWaypointStreet
    end

    return nil, ""
end

local configuredBars = Config.Bars or {}
for _, bar in ipairs(GetFrameworkBars()) do
    configuredBars[#configuredBars + 1] = bar
end

for _, bar in ipairs(configuredBars) do
    if type(bar.source) == "function" then
        bar.getValue = bar.source
    else
        local staticValue = bar.source
        bar.getValue = function()
            return staticValue
        end
    end
    bar.source = nil
end

local barsData = {}
local lastBars = {}
local defaultBarColors = {}
for i, bar in ipairs(configuredBars) do
    defaultBarColors[bar.name] = bar.color
    if isHexColor(hudColors.Bars[bar.name]) then
        bar.color = hudColors.Bars[bar.name]
    else
        hudColors.Bars[bar.name] = nil
    end
    barsData[i] = {
        name = bar.name,
        color = bar.color,
        hideAtZero = bar.hideAtZero,
        hideAtFull = bar.hideAtFull,
        icon = bar.icon,
        value = 0
    }
    lastBars[i] = -1
end

applyHudColors = function()
    local r, g, b = HexToRGB(hudColors.Primary)
    ReplaceHudColourWithRgba(142, r, g, b, 255)
    local northBlip = GetNorthRadarBlip()
    if northBlip ~= 0 then SetBlipSecondaryColour(northBlip, r, g, b) end

    for i, bar in ipairs(configuredBars) do
        barsData[i].color = bar.color
    end

    SendNUIMessage({ action = "updateHudColors", colors = hudColors })
    refreshMapPosition()
end

RegisterCommand("hudsettings", function()
    local colors = {
        Primary = hudColors.Primary,
        Secondary = hudColors.Secondary,
        Bars = {},
        BarIcons = {},
        Defaults = {
            Primary = Config.Colors.Primary,
            Secondary = Config.Colors.Secondary,
            Bars = defaultBarColors
        }
    }

    for name, defaultColor in pairs(defaultBarColors) do
        colors.Bars[name] = hudColors.Bars[name] or defaultColor
    end
    for _, bar in ipairs(configuredBars) do
        colors.BarIcons[bar.name] = bar.icon
    end

    SetNuiFocus(true, true)
    SendNUIMessage({ action = "openHudSettings", colors = colors, locale = getHudLocale() })
end, false)

RegisterNUICallback("saveHudColors", function(data, cb)
    if type(data) ~= "table" or not isHexColor(data.Primary) or not isHexColor(data.Secondary)
        or type(data.Bars) ~= "table" then
        cb({ ok = false, error = "Couleurs invalides." })
        return
    end

    local updatedBarColors = {}
    for _, bar in ipairs(configuredBars) do
        local color = data.Bars[bar.name]
        if not isHexColor(color) then
            cb({ ok = false, error = "Couleur invalide pour " .. bar.name .. "." })
            return
        end
        updatedBarColors[bar.name] = color
        bar.color = color
    end

    hudColors = {
        Primary = data.Primary,
        Secondary = data.Secondary,
        Bars = updatedBarColors
    }
    SetResourceKvp("hudColors", json.encode(hudColors))
    applyHudColors()
    cb({ ok = true })
end)

RegisterNUICallback("closeHudSettings", function(_, cb)
    SetNuiFocus(false, false)
    cb({ ok = true })
end)

AddEventHandler("onResourceStop", function(resourceName)
    if resourceName == GetCurrentResourceName() then
        SetNuiFocus(false, false)
    end
end)

local lastTopLeft = nil
local lastTopRight = nil
local lastHidden = nil
local lastFrameworkRevision = -1
local lastWaypointDist = -1
local lastWaypointStreet = ""

local nuiPayload = {
    action = "updateHud",
    hidden = false,
    bars = barsData,
    topLeft = "",
    topRight = "",
    waypointDistance = nil,
    waypointStreet = ""
}

CreateThread(function()
    Wait(1000)

    local lastPedCoords = vector3(0, 0, 0)
    local lastMoveTime = GetGameTimer()

    while true do
        local ped = PlayerPedId()
        local gameTimer = GetGameTimer()
        local vehicle = GetVehiclePedIsIn(ped, false)
        local isVehicleMoving = vehicle ~= 0 and GetEntitySpeed(vehicle) > 0.5

        local coords = GetEntityCoords(ped)
        if #(coords - lastPedCoords) > 0.5 then
            lastPedCoords = coords
            lastMoveTime = gameTimer
        end
        if isVehicleMoving then
            lastMoveTime = gameTimer
        end

        local isAFK = (gameTimer - lastMoveTime) > 10000
        local sleepInterval = isAFK and 650 or 350
        local changed = false
        local frameworkRevision = GetFrameworkRevision()

        for i, bar in ipairs(configuredBars) do
            if not bar.isFramework or frameworkRevision ~= lastFrameworkRevision then
                local rawVal = bar.getValue(ped)
                local val = math.floor(rawVal or 0)

                if lastBars[i] ~= val then
                    lastBars[i] = val
                    barsData[i].value = val
                    changed = true
                end
            end
        end
        lastFrameworkRevision = frameworkRevision

        local topLeft = ResolveValueCached(Config.Values.TopLeft, ped, coords)
        local topRight = ResolveValueCached(Config.Values.TopRight, ped, coords)
        local hidden = IsHudHidden() or IsPauseMenuActive() or IsRadarHidden()
        local waypointDist, waypointStreet = GetWaypointData(coords)

        if lastHidden ~= hidden then
            lastHidden = hidden
            changed = true
        end

        if lastTopLeft ~= topLeft then
            lastTopLeft = topLeft
            changed = true
        end

        if lastTopRight ~= topRight then
            lastTopRight = topRight
            changed = true
        end

        if lastWaypointDist ~= waypointDist or lastWaypointStreet ~= waypointStreet then
            lastWaypointDist = waypointDist
            lastWaypointStreet = waypointStreet
            changed = true
        end

        if changed then
            nuiPayload.hidden = hidden
            nuiPayload.topLeft = topLeft
            nuiPayload.topRight = topRight
            nuiPayload.waypointDistance = waypointDist
            nuiPayload.waypointStreet = waypointStreet

            SendNUIMessage(nuiPayload)
        end

        Wait(sleepInterval)
    end
end)

CreateThread(function()
    while true do
        Wait(60000)
        collectgarbage("collect")
    end
end)