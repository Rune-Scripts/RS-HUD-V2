const CONFIG = { // DO NOT TOUCH THIS unless you know what your doing.
    normal: { // It is made to calibrate the hud in case your server uses a custom minimap position
        x: 0.40,
        y: 0.98,
        width: 0.08,
        height: -1.5
    },
    bigmap: {
        x: 0.15,
        y: 0.20,
        width: 0.0,
        height: 0.0
    }
};

document.body.innerHTML = `
<div id="hud-wrapper">
    <div id="minimap-border"></div>
    <div id="hud-info">
        <div class="top-container">
            <span id="top-left">VICE CITY</span>
            <span id="top-right">DOWNTOWN</span>
        </div>
        <div class="gps-container">
            <div class="gps-item">
                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e3e3e3"><path d="M480-96q-108 0-174-31.5T240-210q0-17 8.5-32.5T274-272q13-8 28-4t23 17q8 13 4 27.5T312-209l-.5.5.5-.5q8 14 62 27.5T480-168q52 0 106-13.5t62-27.5l.5.5-.5-.5q-13-8-17-22.5t4-27.5q8-13 23-17t28 4q17 14 25.5 29.5T720-210q0 51-66 82.5T480-96Zm-22-140.5q-11-3.5-20-11.5-112-90-167-177.5T216-594q0-66 24-116.5t62-84.5q38-34 85-51.5t93-17.5q46 0 93 17.5t85 51.5q38 34 62 84.5T744-594q0 81-55 168.5T522-248q-9 8-20 11.5t-22 3.5q-11 0-22-3.5ZM480-528q30 0 51-21t21-51q0-30-21-51t-51-21q-30 0-51 21.5T408-600q0 29 21 50.5t51 21.5Z"/></svg>
                <span id="gps-distance"></span>
            </div>
            <div class="gps-item full">
                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e3e3e3"><path d="M491-267.5q5-3.5 7-8.5l4-7q23-45 59.5-71.5T626-423q14-21 21.5-46t7.5-52q0-78-57.5-130.5T460-695q-61 7-104.5 50.5T305-540q-4 32 4 62t25 55q28 42 64.5 68.5T458-283l4 7q2 5 7 8.5t11 3.5q6 0 11-3.5ZM429-469q-21-21-21-51t21-51q21-21 51-21t51 21q21 21 21 51t-21 51q-21 21-51 21t-51-21Zm51 373q-79 0-149-30t-122.5-82.5Q156-261 126-331T96-480q0-80 30-149.5t82.5-122Q261-804 331-834t149-30q80 0 149.5 30t122 82.5Q804-699 834-629.5T864-480q0 79-30 149t-82.5 122.5Q699-156 629.5-126T480-96Z"/></svg>
                <span id="gps-street"></span>
            </div>
        </div>
        <div id="status-bars"></div>
    </div>
</div>
<div id="hud-settings-overlay" class="hud-settings-overlay" aria-hidden="true">
    <section class="hud-settings-card card" role="dialog" aria-modal="true" aria-labelledby="hud-settings-title">
        <header class="hud-settings-header">
            <div>
                <h2 id="hud-settings-title" data-locales="title"></h2>
                <p data-locales="description"></p>
            </div>
            <button id="hud-settings-close" class="btn btn-icon small" type="button">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>            </button>
        </header>
        <div class="hud-settings-section">
            <h3 data-locales="generalColors"></h3>
            <div class="hud-color-grid">
                <div class="hud-color-option">
                    <svg class="hud-general-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a9 9 0 1 0 9 9c0-1.1-.9-2-2-2h-1.1c-.6 0-.9-.7-.5-1.2.4-.5.6-1.1.6-1.8A4 4 0 0 0 14 3h-2Zm-5 10a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm3-4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm-3 5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z"/></svg>
                    <span data-locales="primaryColor"></span>
                    <input id="hud-primary-color" type="color" value="#00ff8c">
                </div>
                <div class="hud-color-option">
                    <svg class="hud-general-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 1 0 0 20h1.2a2.8 2.8 0 0 0 2.2-4.5c-.5-.7 0-1.7.9-1.7H18a4 4 0 0 0 4-4c0-5.4-4.5-9.8-10-9.8ZM6.5 13a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm3-4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm3 4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z"/></svg>
                    <span data-locales="secondaryColor"></span>
                    <input id="hud-secondary-color" type="color" value="#ffffff">
                </div>
            </div>
        </div>
        <div class="hud-settings-section">
            <h3 data-locales="barColors"></h3>
            <div id="hud-bar-colors" class="hud-color-grid"></div>
        </div>
        <footer class="hud-settings-footer">
            <button id="hud-settings-reset" class="btn btn-danger-alt" type="button">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12a9 9 0 1 0 2.64-6.36L3 8m0-5v5h5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                <span data-locales="reset"></span>
            </button>
            <button id="hud-settings-save" class="btn btn-primary" type="button">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3h12l4 4v14H3V3h2Zm2 0v6h10V3M7 21v-8h10v8" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>
                <span data-locales="save"></span>
            </button>
        </footer>
    </section>
</div>
`;

const elements = {
    wrapper: document.getElementById('hud-wrapper'),
    container: document.getElementById('status-bars'),
    elLeft: document.getElementById('top-left'),
    elRight: document.getElementById('top-right'),
    elGpsContainer: document.querySelector('.gps-container'),
    elDist: document.getElementById('gps-distance'),
    elStreet: document.getElementById('gps-street'),
    rootStyle: document.documentElement.style
};

const barCache = new Map();
const settingsOverlay = document.getElementById('hud-settings-overlay');
const barColorInputs = document.getElementById('hud-bar-colors');
const saveButton = document.getElementById('hud-settings-save');
const resetButton = document.getElementById('hud-settings-reset');
let settingsColors = null;
let hudLocale = {};
let activeColorPopover = null;
let saveInProgress = false;
const buttonResetTimers = new WeakMap();

function applyLocale(locale) {
    hudLocale = locale;
    for (const element of document.querySelectorAll('[data-locales]')) {
        element.textContent = locale[element.dataset.locales] || element.dataset.locales;
    }
    for (const element of document.querySelectorAll('[data-locales-aria]')) {
        element.setAttribute('aria-label', locale[element.dataset.localesAria] || element.dataset.localesAria);
    }
    document.documentElement.lang = locale.language || 'en';
}

function enhanceColorInput(input, label) {
    if (input.parentElement.classList.contains('hud-color-picker')) return;

    const picker = document.createElement('div');
    picker.className = 'hud-color-picker';
    const trigger = document.createElement('button');
    trigger.className = 'hud-color-trigger';
    trigger.type = 'button';
    trigger.setAttribute('aria-haspopup', 'dialog');
    trigger.innerHTML = `
        <span class="hud-color-swatch" aria-hidden="true"></span>
        <span class="hud-color-value"></span>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m7 10 5 5 5-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
    `;
    const popover = document.createElement('div');
    popover.className = 'hud-picker-popover';
    popover.setAttribute('role', 'dialog');
    popover.hidden = true;
    popover.innerHTML = `
        <div class="hud-picker-spectrum" role="application" tabindex="0" aria-label="${hudLocale.saturation || 'Color saturation and brightness'}"></div>
        <label class="hud-picker-hue">
            <span>${hudLocale.hue || 'Hue'}</span>
            <input type="range" min="0" max="360" value="150" aria-label="${hudLocale.hue || 'Hue'}">
        </label>
        <div class="hud-picker-bottom">
            <div class="hud-picker-presets"></div>
            <label class="hud-picker-hex">
                <span>HEX</span>
                <input type="text" maxlength="7" spellcheck="false" aria-label="${hudLocale.hexColor || 'Hex color'}">
            </label>
        </div>
    `;

    input.classList.add('hud-native-color-input');
    input.setAttribute('aria-hidden', 'true');
    input.tabIndex = -1;
    input.parentElement.insertBefore(picker, input);
    picker.append(trigger, input);
    document.body.appendChild(popover);

    const spectrum = popover.querySelector('.hud-picker-spectrum');
    const hueInput = popover.querySelector('.hud-picker-hue input');
    const hexInput = popover.querySelector('.hud-picker-hex input');
    const presets = popover.querySelector('.hud-picker-presets');
    const presetColors = ['#ffffff', '#d1d5db', '#6b7280', '#111827', '#ef4444', '#f97316', '#facc15', '#22c55e', '#14b8a6', '#06b6d4', '#3b82f6', '#6366f1', '#a855f7', '#ec4899'];

    for (const color of presetColors) {
        const swatch = document.createElement('button');
        swatch.type = 'button';
        swatch.className = 'hud-picker-preset';
        swatch.style.backgroundColor = color;
        swatch.setAttribute('aria-label', color);
        swatch.title = color;
        swatch.addEventListener('click', () => setColor(color));
        presets.appendChild(swatch);
    }

    const hsvFromHex = hex => {
        const value = hex.slice(1);
        const channels = [0, 2, 4].map(index => parseInt(value.slice(index, index + 2), 16) / 255);
        const [red, green, blue] = channels;
        const max = Math.max(red, green, blue);
        const min = Math.min(red, green, blue);
        const delta = max - min;
        let hue = 0;
        if (delta !== 0) {
            if (max === red) hue = 60 * (((green - blue) / delta) % 6);
            else if (max === green) hue = 60 * ((blue - red) / delta + 2);
            else hue = 60 * ((red - green) / delta + 4);
        }
        return { hue: (hue + 360) % 360, saturation: max === 0 ? 0 : delta / max, brightness: max };
    };

    const hexFromHsv = (hue, saturation, brightness) => {
        const chroma = brightness * saturation;
        const secondary = chroma * (1 - Math.abs((hue / 60) % 2 - 1));
        const offset = brightness - chroma;
        let rgb;
        if (hue < 60) rgb = [chroma, secondary, 0];
        else if (hue < 120) rgb = [secondary, chroma, 0];
        else if (hue < 180) rgb = [0, chroma, secondary];
        else if (hue < 240) rgb = [0, secondary, chroma];
        else if (hue < 300) rgb = [secondary, 0, chroma];
        else rgb = [chroma, 0, secondary];
        return `#${rgb.map(channel => Math.round((channel + offset) * 255).toString(16).padStart(2, '0')).join('')}`;
    };

    const update = () => {
        trigger.querySelector('.hud-color-swatch').style.backgroundColor = input.value;
        trigger.querySelector('.hud-color-value').textContent = input.value.toUpperCase();
        trigger.setAttribute('aria-label', `${hudLocale.chooseColor || 'Choose color'}: ${label}`);
        hexInput.value = input.value.toUpperCase();
        const hsv = hsvFromHex(input.value);
        hueInput.value = Math.round(hsv.hue);
        spectrum.style.backgroundColor = `hsl(${hsv.hue} 100% 50%)`;
        spectrum.style.setProperty('--saturation', `${hsv.saturation * 100}%`);
        spectrum.style.setProperty('--brightness', `${(1 - hsv.brightness) * 100}%`);
    };

    const setColor = color => {
        input.value = color.toLowerCase();
        update();
        input.dispatchEvent(new Event('input', { bubbles: true }));
    };

    const closePopover = () => {
        popover.hidden = true;
        trigger.setAttribute('aria-expanded', 'false');
        if (activeColorPopover?.popover === popover) activeColorPopover = null;
    };

    const openPopover = () => {
        if (activeColorPopover) activeColorPopover.close();
        const rect = trigger.getBoundingClientRect();
        popover.hidden = false;
        popover.setAttribute('aria-label', `${hudLocale.chooseColor || 'Choose color'}: ${label}`);
        const popoverWidth = popover.offsetWidth;
        const left = Math.max(12, Math.min(rect.left, window.innerWidth - popoverWidth - 12));
        const top = rect.bottom + popover.offsetHeight + 12 <= window.innerHeight
            ? rect.bottom + 8
            : Math.max(12, rect.top - popover.offsetHeight - 8);
        popover.style.left = `${left}px`;
        popover.style.top = `${top}px`;
        trigger.setAttribute('aria-expanded', 'true');
        activeColorPopover = { popover, trigger, close: closePopover };
    };

    trigger.setAttribute('aria-expanded', 'false');
    trigger.addEventListener('click', () => {
        if (popover.hidden) openPopover();
        else closePopover();
    });

    const updateFromSpectrum = event => {
        const rect = spectrum.getBoundingClientRect();
        const saturation = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
        const brightness = 1 - Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
        spectrum.style.setProperty('--saturation', `${saturation * 100}%`);
        spectrum.style.setProperty('--brightness', `${(1 - brightness) * 100}%`);
        setColor(hexFromHsv(Number(hueInput.value), saturation, brightness));
    };

    spectrum.addEventListener('pointerdown', event => {
        spectrum.setPointerCapture(event.pointerId);
        updateFromSpectrum(event);
    });
    spectrum.addEventListener('pointermove', event => {
        if (spectrum.hasPointerCapture(event.pointerId)) updateFromSpectrum(event);
    });
    hueInput.addEventListener('input', () => {
        const hsv = hsvFromHex(input.value);
        setColor(hexFromHsv(Number(hueInput.value), hsv.saturation, hsv.brightness));
    });
    hexInput.addEventListener('change', () => {
        const value = hexInput.value.startsWith('#') ? hexInput.value : `#${hexInput.value}`;
        if (/^#[0-9a-f]{6}$/i.test(value)) setColor(value);
        else hexInput.value = input.value.toUpperCase();
    });
    spectrum.addEventListener('keydown', event => {
        const step = event.shiftKey ? 0.1 : 0.02;
        const hsv = hsvFromHex(input.value);
        if (event.key === 'ArrowRight') hsv.saturation = Math.min(1, hsv.saturation + step);
        else if (event.key === 'ArrowLeft') hsv.saturation = Math.max(0, hsv.saturation - step);
        else if (event.key === 'ArrowUp') hsv.brightness = Math.min(1, hsv.brightness + step);
        else if (event.key === 'ArrowDown') hsv.brightness = Math.max(0, hsv.brightness - step);
        else return;
        event.preventDefault();
        setColor(hexFromHsv(Number(hueInput.value), hsv.saturation, hsv.brightness));
    });
    document.addEventListener('pointerdown', event => {
        if (!popover.hidden && !popover.contains(event.target) && !picker.contains(event.target)) closePopover();
    });
    input.addEventListener('input', update);
    input.addEventListener('change', update);
    update();
}

function postNui(callback, data = {}) {
    return fetch(`https://${GetParentResourceName()}/${callback}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        body: JSON.stringify(data)
    }).then(response => response.json());
}

function setHudColors(colors) {
    elements.rootStyle.setProperty('--primary', colors.Primary);
    elements.rootStyle.setProperty('--secondary', colors.Secondary);
    for (const [name, color] of Object.entries(colors.Bars || {})) {
        const node = barCache.get(name);
        if (node) node.square.style.setProperty('--bar-color', color);
    }
}

function populateHudSettings(colors) {
    settingsColors = colors;
    applyLocale(colors.Locale || hudLocale);
    const primaryInput = document.getElementById('hud-primary-color');
    const secondaryInput = document.getElementById('hud-secondary-color');
    primaryInput.value = colors.Primary;
    secondaryInput.value = colors.Secondary;
    enhanceColorInput(primaryInput, hudLocale.primaryColor || 'Primary color');
    enhanceColorInput(secondaryInput, hudLocale.secondaryColor || 'Secondary color');
    primaryInput.dispatchEvent(new Event('input'));
    secondaryInput.dispatchEvent(new Event('input'));
    barColorInputs.replaceChildren();

    for (const [name, color] of Object.entries(colors.Bars || {})) {
        const option = document.createElement('div');
        option.className = 'hud-color-option';
        const iconMarkup = colors.BarIcons?.[name];
        if (iconMarkup) {
            const iconTemplate = document.createElement('template');
            iconTemplate.innerHTML = iconMarkup;
            const icon = iconTemplate.content.querySelector('svg');
            if (icon) {
                icon.classList.add('hud-bar-icon');
                option.appendChild(icon);
            }
        }
        const text = document.createElement('span');
        const translatedName = hudLocale[`bar.${name}`] || name;
        text.textContent = translatedName;
        const input = document.createElement('input');
        input.type = 'color';
        input.dataset.barName = name;
        input.value = color;
        option.append(text, input);
        enhanceColorInput(input, translatedName);
        barColorInputs.appendChild(option);
    }

    settingsOverlay.classList.add('is-open');
    settingsOverlay.setAttribute('aria-hidden', 'false');
}

function closeHudSettings() {
    settingsOverlay.classList.remove('is-open');
    settingsOverlay.setAttribute('aria-hidden', 'true');
    postNui('closeHudSettings').catch(error => console.error('Could not close HUD settings:', error));
}

document.getElementById('hud-settings-close').addEventListener('click', closeHudSettings);
function showButtonFeedback(button, message, labelKey) {
    const text = button.querySelector('span');
    if (!text) return;

    const previousTimer = buttonResetTimers.get(button);
    if (previousTimer) clearTimeout(previousTimer);
    text.textContent = message;
    buttonResetTimers.set(button, setTimeout(() => {
        text.textContent = hudLocale[labelKey] || labelKey;
        buttonResetTimers.delete(button);
    }, 1800));
}

async function saveHudColors(button, labelKey) {
    if (saveInProgress) return;
    saveInProgress = true;
    saveButton.disabled = true;
    resetButton.disabled = true;

    const colors = {
        Primary: document.getElementById('hud-primary-color').value,
        Secondary: document.getElementById('hud-secondary-color').value,
        Bars: {}
    };
    for (const input of barColorInputs.querySelectorAll('input[data-bar-name]')) {
        colors.Bars[input.dataset.barName] = input.value;
    }

    try {
        const result = await postNui('saveHudColors', colors);
        if (!result || !result.ok) throw new Error(hudLocale.saveError || 'Could not save colors.');
        settingsColors = { ...settingsColors, ...colors };
        setHudColors(colors);
        showButtonFeedback(button, hudLocale[labelKey] || 'Done', button === resetButton ? 'reset' : 'save');
    } catch (error) {
        console.error('Could not save HUD colors:', error);
        showButtonFeedback(button, hudLocale.saveError || 'Could not save colors.', button === resetButton ? 'reset' : 'save');
    } finally {
        saveInProgress = false;
        saveButton.disabled = false;
        resetButton.disabled = false;
    }
}

saveButton.addEventListener('click', () => saveHudColors(saveButton, 'saved'));

resetButton.addEventListener('click', () => {
    if (!settingsColors?.Defaults) return;
    populateHudSettings({
        ...settingsColors.Defaults,
        BarIcons: settingsColors.BarIcons,
        Defaults: settingsColors.Defaults
    });
    saveHudColors(resetButton, 'resetDone');
});

document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
        if (activeColorPopover) {
            const { close, trigger } = activeColorPopover;
            close();
            trigger.focus();
        } else if (settingsOverlay.classList.contains('is-open')) {
            closeHudSettings();
        }
    }
});

function getBarElements(bar) {
    let cached = barCache.get(bar.name);
    if (!cached) {
        let square = document.getElementById(`status-${bar.name}`);

        if (!square) {
            square = document.createElement('div');
            square.className = 'status-square';
            square.id = `status-${bar.name}`;
            const iconHTML = bar.icon || `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8" fill="currentColor"/></svg>`;
            const svgBorderHTML = `<svg class="border-svg" viewBox="0 0 32 32">
                    <rect class="border-bg-path" x="2" y="2" width="28" height="28" rx="8" />
                    <rect class="border-fill-path" id="path-${bar.name}" x="2" y="2" width="28" height="28" rx="8" 
                          stroke-dasharray="98.8" stroke-dashoffset="0" /></svg>`;

            square.innerHTML = iconHTML + svgBorderHTML;
            elements.container.appendChild(square);
        }

        const fillPath = document.getElementById(`path-${bar.name}`);
        cached = { square, fillPath, lastVal: null };
        barCache.set(bar.name, cached);
    }
    return cached;
}

window.addEventListener('message', function(event) {
    const data = event.data;
    if (!data) return;

    if (data.action === 'updateHud') {
        const isHidden = data.hidden ? 'none' : 'block';
        if (elements.wrapper.style.display !== isHidden) {
            elements.wrapper.style.display = isHidden;
        }
        if (data.hidden) return;

        if (Array.isArray(data.bars)) {
            for (let i = 0; i < data.bars.length; i++) {
                const bar = data.bars[i];
                const node = getBarElements(bar);
                const val = Math.min(100, Math.max(0, bar.value));

                if (node.lastVal !== val) {
                    node.square.style.setProperty('--bar-color', bar.color);
                    node.square.style.display = (bar.hideAtZero && val <= 0) || (bar.hideAtFull && val >= 100) ? 'none' : 'flex';
                    const perimeter = 98.8;
                    const offset = perimeter - (perimeter * (val / 100));
                    node.fillPath.style.strokeDashoffset = offset;
                    node.lastVal = val;
                }
            }
        }

        const newLeft = data.topLeft || 'Unknown';
        const newRight = data.topRight || '';
        if (data.waypointDistance !== null && data.waypointDistance !== undefined) {
            elements.elGpsContainer.style.display = "flex";

            const formattedDist = data.waypointDistance >= 1000 
                ? (data.waypointDistance / 1000).toFixed(1) + " km" 
                : Math.floor(data.waypointDistance) + " m";

            if (elements.elDist.textContent !== formattedDist) {
                elements.elDist.textContent = formattedDist;
            }

            const newStreet = data.waypointStreet || 'Destination';
            if (elements.elStreet.textContent !== newStreet) {
                elements.elStreet.textContent = newStreet;
            }
        } else {
            elements.elGpsContainer.style.display = "none";
        }

        if (elements.elLeft.textContent !== newLeft) elements.elLeft.textContent = newLeft;
        if (elements.elRight.textContent !== newRight) elements.elRight.textContent = newRight;
    }

    if (data.action === 'openHudSettings' && data.colors) {
        applyLocale(data.locale || {});
        populateHudSettings(data.colors);
    }

    if (data.action === 'updateHudColors' && data.colors) {
        setHudColors(data.colors);
    }

    if (data.action === 'updateMinimap') {
        if (data.colormap) {
            elements.rootStyle.setProperty('--primary', data.colormap.Primary);
            elements.rootStyle.setProperty('--secondary', data.colormap.Secondary);
        }
        const offset = data.isBigmap ? CONFIG.bigmap : CONFIG.normal;
        const style = elements.wrapper.style;

        style.left = `${data.left * 100 + offset.x}%`;
        style.top = `${data.top * 100 + offset.y}%`;
        style.width = `${data.width * 100 + offset.width}%`;
        style.height = `${data.height * 100 + offset.height}%`;
    }
});