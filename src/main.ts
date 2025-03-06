import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// Fix jQuery issue
import $ from "jquery";
(window as any).$ = $;
(window as any).jQuery = $;
import "jquery-mousewheel";
import mousewheel from "jquery-mousewheel";
mousewheel($);

import 'luckysheet/dist/plugins/css/pluginsCss.css';
import 'luckysheet/dist/plugins/plugins.css';
import 'luckysheet/dist/css/luckysheet.css';
import 'luckysheet/dist/assets/iconfont/iconfont.css';

// ✅ Import Luckysheet (AFTER mousewheel)
import luckysheet from "luckysheet";

createApp(App).mount('#app')
