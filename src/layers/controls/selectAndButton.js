
// export

export function initSelectAndButtonControl() {
    // 为了实现下拉框和按钮的控件，我们需要创建一个新的控件类
    // 该类继承自 L.Control
    // 代码如下：
    L.Control.SelectAndButton = L.Control.extend({
        options: {
            position: 'topleft', // 控件位置
            columns: [],         // 下拉框选项
            buttonName: 'Show',  // 按钮名称
            info: 'Select a column to show', // 信息文本
            onButtonClick: null  // 按钮点击回调函数
        },

        initialize: function (options) {
            L.Util.setOptions(this, options); // 合并选项
            this._container = null; // 用于保存控件的容器
            this._button = null; // 用于保存按钮引用
            this._select = null; // 用于保存下拉框引用
        },

        onAdd: function (map) {
            // 创建控件主容器
            const container = L.DomUtil.create('div', 'leaflet-control-select-button');
            this._container = container;

            // 防止控件与地图拖动交互冲突
            L.DomEvent.disableClickPropagation(container);

            // 创建信息文本
            const infoElement = L.DomUtil.create('div', 'select-button-info', container);
            infoElement.innerText = this.options.info;

            // 创建下拉框
            const select = L.DomUtil.create('select', 'select-button-dropdown', container);
            select.id = `dropdown-${L.Util.stamp(this)}`; // 添加唯一 ID
            this._select = select;
            
            // 排序列名
            this.options.columns = sortColumnsByNumber(this.options.columns);
            


            this.options.columns.forEach(option => {
                const optionElement = L.DomUtil.create('option', '', select);
                optionElement.value = option;
                optionElement.innerText = option;
            });

            // 创建按钮
            const button = L.DomUtil.create('button', 'select-button-button', container);
            button.innerText = this.options.buttonName;
            this._button = button;

            // 添加按钮点击事件监听
            const onButtonClick = () => {
                const selectedColumn = select.value;
                if (this.options.onButtonClick) {
                    this.options.onButtonClick(selectedColumn);
                }
            };
            L.DomEvent.on(button, 'click', onButtonClick);

            return container;
        },

        onRemove: function (map) {
        }
    });

    // 工厂方法
    L.control.selectAndButton = function (options) {
        return new L.Control.SelectAndButton(options);
    };
}

function extractNumberFromString(str) {
    // 提取字符串中的数字
    const match = str.match(/\d+/g);
    return match ? parseInt(match[0]) : null; // 返回第一个数字，如果没有数字返回 null
}

function sortColumnsByNumber(columns) {
    return columns.slice().sort((a, b) => {
        const numA = extractNumberFromString(a);
        const numB = extractNumberFromString(b);

        // 若两者都有数字，则按数字升序排列
        if (numA !== null && numB !== null) {
            return numA - numB;
        }

        // 若只有一个含有数字，则无数字的放在后面
        if (numA !== null) return -1;
        if (numB !== null) return 1;

        // 若两者都没有数字，则保持原样的顺序
        return 0;
    });
}
// export default L.Control.SelectAndButton;