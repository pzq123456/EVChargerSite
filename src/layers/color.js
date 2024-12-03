// 颜色名到RGB的映射
const colorNames = {
    "black": "#000000",
    "white": "#ffffff",
    "red": "#ff0000",
    "green": "#00ff00",
    "blue": "#0000ff",
    "yellow": "#ffff00",
    // 可以扩展更多颜色名
};

// 将颜色名转换为RGB
function nameToRGB(name) {
    if (colorNames[name.toLowerCase()]) {
        return hexToRGB(colorNames[name.toLowerCase()]);
    }
    throw new Error(`未知的颜色名: ${name}`);
}

// 将HEX转换为RGB
function hexToRGB(hex) {
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16); // 修正错误
    let b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b, a: 1 };
}

// 将RGBA字符串转换为RGB
function rgbaToRGB(rgba) {
    let parts = rgba.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d?\.?\d+))?\)/);
    return { r: parseInt(parts[1]), g: parseInt(parts[2]), b: parseInt(parts[3]), a: parts[4] ? parseFloat(parts[4]) : 1 };
}

// 将HLS字符串转换为RGB（HLS转RGB的实现可在需要时补充）

// 解析输入颜色
function parseColor(color) {
    if (color.startsWith("#")) {
        return hexToRGB(color);
    } else if (color.startsWith("rgba") || color.startsWith("rgb")) {
        return rgbaToRGB(color);
    } else if (colorNames[color.toLowerCase()]) {
        return nameToRGB(color);
    } else {
        throw new Error(`无法解析颜色: ${color}`);
    }
}

// 颜色插值算法
export function interpolateColors(startColor, endColor, steps) {
    startColor = parseColor(startColor);
    endColor = parseColor(endColor);
    
    if (steps < 3) {
        throw new Error("分级个数不少于3");
    }

    const colors = [];
    for (let i = 0; i < steps; i++) {
        const t = i / (steps - 1);
        const r = Math.round(startColor.r + t * (endColor.r - startColor.r));
        const g = Math.round(startColor.g + t * (endColor.g - startColor.g));
        const b = Math.round(startColor.b + t * (endColor.b - startColor.b));
        colors.push(`rgb(${r}, ${g}, ${b})`);
    }

    return colors;
}

