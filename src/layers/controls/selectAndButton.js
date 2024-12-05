
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

// export default L.Control.SelectAndButton;