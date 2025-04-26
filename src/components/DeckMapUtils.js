export function main(deckmap, data) {
    const { DeckGL, HexagonLayer } = deck;

    const deckgl = new DeckGL({
        //   container: 'deck-map',
        mapStyle: 'https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json',
        initialViewState: {
            longitude: 114,
            latitude: 36,
            zoom: 4,
            minZoom: 2,
            maxZoom: 10,
            pitch: 55
        },
        controller: true,
        container: deckmap,
        getCursor: ({ isHovering }) => isHovering ? 'pointer' : 'default',
    });

    const COLOR_RANGE = [
        [1, 152, 189],
        [73, 227, 206],
        [216, 254, 181],
        [254, 237, 177],
        [254, 173, 84],
        [209, 55, 78]
    ];

    function renderLayer() {
        const hexagonLayer = new HexagonLayer({
            id: 'heatmap',
            colorRange: COLOR_RANGE,
            data: mydata,
            elevationRange: [10, 2000],
            elevationScale: 100,
            extruded: true,
            getPosition: d => d,
            colorScaleType: 'linear',
            coverage: 0.7,
            radius: 10000,
        });

        deckgl.setProps({
            layers: [hexagonLayer]
        });
    }

    // 数据加载和合并
    let mydata = [];

    mydata = mydata.concat(
        data.eu.map(d => ([Number(d.grid_lon), Number(d.grid_lat), Number(d.count) || 0]))
    );

    mydata = mydata.concat(
        data.us.map(d => ([Number(d.grid_lon), Number(d.grid_lat), Number(d.count) || 0]))
    );

    mydata = mydata.concat(
        data.cn.map(d => ([Number(d.grid_lon), Number(d.grid_lat), Number(d.count) || 0]))
    );

    // 渲染图层
    renderLayer();

    return deckgl;
}

export function loadDeckResources(callback, container, data) {
    return new Promise((resolve, reject) => {
        let resourcesLoaded = 0;
        const totalResources = 4;

        function resourceLoaded() {
            resourcesLoaded += 1;
            if (resourcesLoaded === totalResources) {
                let deckgl = callback(container, data);
                resolve(deckgl);
            }
        }

        function resourceFailed() {
            reject(new Error('Failed to load resources'));
        }

        // 加载 Deck JS
        const deckScript = document.createElement('script');
        deckScript.src = 'https://unpkg.com/deck.gl@^9.0.0/dist.min.js';
        deckScript.onload = resourceLoaded;
        deckScript.onerror = resourceFailed;
        document.head.appendChild(deckScript);

        // 加载 Maplibre CSS
        const maplibreCSS = document.createElement('link');
        maplibreCSS.rel = 'stylesheet';
        maplibreCSS.href = 'https://unpkg.com/maplibre-gl@3.6.0/dist/maplibre-gl.css';
        maplibreCSS.onload = resourceLoaded;
        maplibreCSS.onerror = resourceFailed;
        document.head.appendChild(maplibreCSS);

        // 加载 Maplibre JS
        const maplibreScript = document.createElement('script');
        maplibreScript.src = 'https://unpkg.com/maplibre-gl@3.6.0/dist/maplibre-gl.js';
        maplibreScript.onload = resourceLoaded;
        maplibreScript.onerror = resourceFailed;
        document.head.appendChild(maplibreScript);

        // 加载 D3 JS
        const d3Script = document.createElement('script');
        d3Script.src = 'https://d3js.org/d3.v5.min.js';
        d3Script.onload = resourceLoaded;
        d3Script.onerror = resourceFailed;
        document.head.appendChild(d3Script);
    });
}

export function cleanupDeckResources() {
    document.head.removeChild(document.querySelector('link[href="https://unpkg.com/maplibre-gl@3.6.0/dist/maplibre-gl.css"]'));
    document.head.removeChild(document.querySelector('script[src="https://unpkg.com/maplibre-gl@3.6.0/dist/maplibre-gl.js"]'));
    document.head.removeChild(document.querySelector('script[src="https://d3js.org/d3.v5.min.js"]'));
    document.head.removeChild(document.querySelector('script[src="https://unpkg.com/deck.gl@^9.0.0/dist.min.js"]'));
}

// Anmiation
export function setViewState(deckgl, viewState, currentViewState) {
    currentViewState = { ...currentViewState, ...viewState };
    deckgl.setProps({
        viewState: currentViewState,
        onViewStateChange: ({ viewState }) => {
            currentViewState = viewState; // 动态同步用户交互的视图状态
            deckgl.setProps({ viewState });
        }
    });
}


// @/components/DeckMapUtils.js

// 视图预设配置
export const viewPresets = {
    global: { longitude: 0, latitude: 30, zoom: 2, pitch: 0 },
    china: { longitude: 114, latitude: 36, zoom: 4, pitch: 55 },
    europe: { longitude: 8.6821, latitude: 50.1109, zoom: 4, pitch: 55 },
    usa: { longitude: -98.5795, latitude: 39.8283, zoom: 4, pitch: 55 },

    // 美国西海岸特写
    usaWest: { longitude: -119.4179, latitude: 36.7783, zoom: 6, pitch: 55 },
    // 美国东海岸特写
    usaEast: { longitude: -74.006, latitude: 40.7128, zoom: 6, pitch: 55 },

    // 中国 长三角地区
    cnYangtzeRiverDelta: { longitude: 120.5, latitude: 31.5, zoom: 6, pitch: 55 },
    // 中国 珠三角地区
    cnPearlRiverDelta: { longitude: 113.5, latitude: 22.5, zoom: 6, pitch: 55 },
    // 中国 京津冀地区
    cnBeijingTianjinHebei: { longitude: 116.5, latitude: 39.5, zoom: 6, pitch: 55 },

    // 欧洲英国地区特写
    euUK: { longitude: -3.435973, latitude: 55.378051, zoom: 6, pitch: 55 },
    // 欧洲法国地区特写
    euFrance: { longitude: 2.3522, latitude: 48.8566, zoom: 6, pitch: 55 },
};

// 动画管理器
export class AnimationManager {
    constructor(deckgl) {
        this.deckgl = deckgl;
        this.currentViewState = { ...viewPresets.global };
        this.animationId = null;
    }

    setViewState(viewState) {
        this.currentViewState = { ...this.currentViewState, ...viewState };
        this.deckgl.setProps({
            viewState: this.currentViewState,
            onViewStateChange: ({ viewState }) => {
                this.currentViewState = viewState;
                this.deckgl.setProps({ viewState });
            }
        });
    }

    flyTo(targetViewState, duration = 2000) {
        if (!this.deckgl) return;

        const startViewState = { ...this.currentViewState };
        const startTime = performance.now();

        this.cancelAnimation();

        const animate = () => {
            const elapsedTime = performance.now() - startTime;
            const t = Math.min(elapsedTime / duration, 1);

            const easing = t => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

            const interpolatedViewState = {
                longitude: startViewState.longitude + (targetViewState.longitude - startViewState.longitude) * easing(t),
                latitude: startViewState.latitude + (targetViewState.latitude - startViewState.latitude) * easing(t),
                zoom: startViewState.zoom + (targetViewState.zoom - startViewState.zoom) * easing(t),
                pitch: startViewState.pitch + (targetViewState.pitch - startViewState.pitch) * easing(t),
            };

            this.setViewState(interpolatedViewState);

            if (t < 1) {
                this.animationId = requestAnimationFrame(animate);
            }
        };

        this.animationId = requestAnimationFrame(animate);
    }

    startAutoAnimation(endCallBack) {
        if (!this.deckgl) return;

        // 定义动画序列
        const animationSequence = [
            { viewState: viewPresets.global, duration: 2000, delay: 500 },

            { viewState: { ...viewPresets.china, zoom: 4, pitch: 35 }, duration: 2000 },
            { viewState: viewPresets.cnYangtzeRiverDelta, duration: 2000 },
            { viewState: viewPresets.cnPearlRiverDelta, duration: 2000 },
            // { viewState: viewPresets.cnBeijingTianjinHebei, duration: 2000 },
            { viewState: { ...viewPresets.china, zoom: 4, pitch: 35 }, duration: 1000 },

            { viewState: { ...viewPresets.europe, zoom: 4, pitch: 35 }, duration: 2000 },
            // { viewState: viewPresets.euUK, duration: 2000 },
            { viewState: viewPresets.euFrance, duration: 2000 },
            { viewState: { ...viewPresets.europe, zoom: 4, pitch: 35 }, duration: 1000 },


            { viewState: { ...viewPresets.usa, zoom: 4, pitch: 35 }, duration: 2000 },
            { viewState: viewPresets.usaWest, duration: 2000 },
            { viewState: viewPresets.usaEast, duration: 2000 },
            { viewState: { ...viewPresets.usa, zoom: 4, pitch: 35 }, duration: 1000 },

            { viewState: viewPresets.global, duration: 1500 }
        ];

        // 执行动画序列
        let cumulativeDelay = 0;
        animationSequence.forEach((step, index) => {
            cumulativeDelay += (index > 0 ? animationSequence[index - 1].duration : 0) + (step.delay || 0);
            setTimeout(() => {
                this.flyTo(step.viewState, step.duration);
            }, cumulativeDelay);
        });

        //   动画结束后执行回调
        const totalDuration = animationSequence.reduce((sum, step) => sum + step.duration + (step.delay || 0), 0);
        setTimeout(() => {
            if (endCallBack) endCallBack();
        }, totalDuration);
    }

    cancelAnimation() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }

    destroy() {
        this.cancelAnimation();
        this.deckgl = null;
    }
}