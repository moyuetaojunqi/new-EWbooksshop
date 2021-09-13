import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueQriously from 'vue-qriously'

import {Button, Tag, Image as VanImage, Swipe, SwipeItem, Lazyload, Badge, Sidebar, SidebarItem, Collapse, CollapseItem, Card, Tab, Tabs, Form, Field, Checkbox, CheckboxGroup, Stepper, SwipeCell, SubmitBar, Icon, AddressEdit, AddressList, Popup, Grid, GridItem, PullRefresh, List } from 'vant'

createApp(App)
.use(Lazyload, {loading:require('./assets/image/collect.png')}).use(VanImage).use(Button).use(Tag).use(Icon).use(AddressEdit).use(AddressList).use(Popup).use(Grid).use(GridItem).use(VueQriously).use(PullRefresh).use(List)
.use(Swipe).use(SwipeItem).use(Badge).use(Sidebar).use(SidebarItem).use(Collapse).use(CollapseItem).use(Card).use(Tab).use(Tabs).use(Form).use(Field).use(Stepper).use(SwipeCell).use(CheckboxGroup).use(Checkbox).use(SubmitBar)
.use(store).use(router).mount('#app')
