local frameworkName = string.lower(Config.Framework or 'esx')
local frameworkObject = nil
local frameworkCache = {
    hunger = 100,
    thirst = 100
}
local frameworkRevision = 1

local function updateCache(metadata)
    if type(metadata) ~= 'table' then return end
    local changed = false
    if metadata.hunger ~= nil and frameworkCache.hunger ~= metadata.hunger then
        frameworkCache.hunger = metadata.hunger
        changed = true
    end
    if metadata.thirst ~= nil and frameworkCache.thirst ~= metadata.thirst then
        frameworkCache.thirst = metadata.thirst
        changed = true
    end
    if changed then frameworkRevision = frameworkRevision + 1 end
end

local function updateFromPlayerData(playerData)
    if type(playerData) ~= 'table' then return end
    updateCache(playerData.metadata)
end

local function getPlayerData()
    if frameworkName == 'esx' then
        frameworkObject = frameworkObject or exports['es_extended']:getSharedObject()
        return frameworkObject.GetPlayerData()
    elseif frameworkName == 'qbcore' then
        frameworkObject = frameworkObject or exports['qb-core']:GetCoreObject()
        return frameworkObject.Functions.GetPlayerData()
    elseif frameworkName == 'qbox' then
        return exports.qbx_core:GetPlayerData()
    end
    return nil
end

if frameworkName == 'esx' then
    RegisterNetEvent('esx_status:onTick', function(status)
        if type(status) ~= 'table' then return end
        local changed = false
        for i = 1, #status do
            local s = status[i]
            if s.name == 'hunger' then
                local val = s.percent or (s.val and (s.val / 10000)) or 100
                if frameworkCache.hunger ~= val then
                    frameworkCache.hunger = val
                    changed = true
                end
            elseif s.name == 'thirst' then
                local val = s.percent or (s.val and (s.val / 10000)) or 100
                if frameworkCache.thirst ~= val then
                    frameworkCache.thirst = val
                    changed = true
                end
            end
        end
        if changed then
            frameworkRevision = frameworkRevision + 1
        end
    end)
elseif frameworkName == 'qbcore' then
    RegisterNetEvent('QBCore:Player:SetPlayerData', function(playerData)
        updateFromPlayerData(playerData)
    end)
    RegisterNetEvent('QBCore:Player:UpdatePlayerData', function(playerData)
        updateFromPlayerData(playerData)
    end)
elseif frameworkName == 'qbox' then
    RegisterNetEvent('QBCore:Player:SetPlayerData', function(playerData)
        updateFromPlayerData(playerData)
    end)
    RegisterNetEvent('qbx_core:playerLoaded', function(playerData)
        updateFromPlayerData(playerData)
    end)
end



function GetFrameworkBars()
    local bars = {}
    for _, bar in ipairs(Config.FrameworkBars or {}) do
        bars[#bars + 1] = {
            name = bar.name,
            color = bar.color,
            hideAtZero = bar.hideAtZero,
            hideAtFull = bar.hideAtFull,
            icon = bar.icon,
            source = function()
                return frameworkCache[bar.name] or 0
            end,
            isFramework = true
        }
    end
    return bars
end

function GetFrameworkRevision()
    return frameworkRevision
end


-- debug framework
if frameworkName == 'esx' and Config.debug == true then
	RegisterCommand('es-status', function()
		if frameworkName == 'esx' then
			TriggerEvent('esx_status:getStatus', 'hunger', function(status)
				local val = status and status.getPercent() or 'N/A'
				print(string.format('^3[DEBUG ESX] esx_status Hunger : %s^7', tostring(val)))
			end)

			TriggerEvent('esx_status:getStatus', 'thirst', function(status)
				local val = status and status.getPercent() or 'N/A'
				print(string.format('^3[DEBUG ESX] esx_status Thirst : %s^7', tostring(val)))
			end)
		end
	end, false)
end