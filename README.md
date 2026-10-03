# V1.4.0 has been released !

### Ingame Preview

<img width="1920" height="1080" alt="Capture d&#39;écran 2026-09-05 182147" src="https://github.com/user-attachments/assets/c665298e-5309-43a8-92a8-26677916823d" />
<img width="1920" height="1080" alt="Capture d&#39;écran 2026-09-05 182230" src="https://github.com/user-attachments/assets/e0b82a19-73b2-43cc-a8b0-cc757dc674a6" />
<img width="1919" height="1079" alt="rs_hudv2_settings" src="https://github.com/user-attachments/assets/00600438-3f20-4694-bec5-b87b180753d8" />
<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/0b13733d-6ec4-4167-9f87-83fd3abeef9e" />


### Config.lua

```lua
Config.Framework = 'esx' -- 'esx', 'qbcore', 'qbox'
Config.Locales = 'en' -- Available locales: 'fr', 'en'

Config.Colors = {
    Primary = '#00FF8C', Secondary = '#FFFFFF'
}

Config.Values = { -- gametime, streetname, zonename or serverid
    TopLeft = 'serverid',
    TopRight = 'zonename'
}

Config.Bars = {
    {name = 'health', color = '#ff0055', hideAtZero = false, icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path fill="currentColor" d="M451.5-152q-14.5-5-25.5-16l-69-63q-106-97-191.5-192.5T80-634q0-94 63-157t157-63q53 0 100 22.5t80 61.5q33-39 80-61.5T660-854q94 0 157 63t63 157q0 115-85 211T602-230l-68 62q-11 11-25.5 16t-28.5 5q-14 0-28.5-5Z"/></svg>', source = function(ped) return (GetEntityHealth(ped) * 100) / 200 end},
    {name = 'armor', color = '#00ff88', hideAtZero = true, icon = '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-5.45 9-12V5l-9-4z"/></svg>', source = function(ped) return GetPedArmour(ped) end},
    {name = 'oxygen', color = '#38bdf8', hideAtFull = true, icon = '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2.5c-3.4 4.3-7 8.1-7 12a7 7 0 0 0 14 0c0-3.9-3.6-7.7-7-12Zm0 16a4 4 0 0 1-4-4c0-.6.4-1 1-1s1 .4 1 1a2 2 0 0 0 2 2c.6 0 1 .4 1 1s-.4 1-1 1Z"/></svg>', source = function(ped) return IsPedSwimmingUnderWater(ped) and (GetPlayerUnderwaterTimeRemaining(PlayerId()) * 10.0) or 100 end},
    {name = 'stamina', color = '#facc15', hideAtFull = true, icon = '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M13.5 2 4 13h6l-.5 9L20 10h-6l-.5-8Z"/></svg>', source = function(ped) return 100 - GetPlayerSprintStaminaRemaining(PlayerId()) end},
}

Config.FrameworkBars = { -- hunger, thirst (will add more in v2.0.0)
    {name = 'hunger', color = '#ff6811', hideAtZero = false, icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path fill="currentColor" d="m784-262-59-29 77-188 67 130q22 41-10.5 74.5T784-262Zm-176-41 31-340q1-12 11.5-18.5T672-663l87 35q19 8 27 26t0 36L678-303h-70Zm-326 0L175-566q-8-19 0-37t27-26l86-34q11-5 21.5 1.5T321-643l31 340h-70Zm-106 41q-42 20-73.5-12.5T91-349l67-130 77 188-59 29Zm225-41-35-380q-2-21 12.5-36.5T414-735h132q21 0 35.5 15.5T594-683l-35 380H401Z"/></svg>'},
    {name = 'thirst', color = '#00b7ff', hideAtZero = false, icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path fill="currentColor" d="M269-445q43-23 90-35t96-12q29 0 57 4.5t55 12.5q31 9 58.5 14t50.5 5h17l41-336H226l43 347Zm35 349q-27 0-47.5-18T232-159l-78-624q-4-32 18-56.5t54-24.5h508q32 0 54 24.5t18 56.5l-78 624q-4 27-24.5 45T656-96H304Z"/></svg>'},
}


Config.debug = true
```

## Get support on [Discord](https://discord.gg/abFcpDKqdX)
