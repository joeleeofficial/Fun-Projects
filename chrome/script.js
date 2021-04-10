import"chrome://new-tab-page/strings.m.js";import{PolymerElement,html,microTask}from"chrome://resources/polymer/v3_0/polymer/polymer_bundled.min.js";import"chrome://resources/mojo/mojo/public/js/mojo_bindings_lite.js";import"chrome://resources/mojo/mojo/public/mojom/base/big_buffer.mojom-lite.js";import"chrome://resources/mojo/mojo/public/mojom/base/string16.mojom-lite.js";import"chrome://resources/mojo/mojo/public/mojom/base/text_direction.mojom-lite.js";import"chrome://resources/mojo/mojo/public/mojom/base/time.mojom-lite.js";import"chrome://resources/mojo/skia/public/mojom/skcolor.mojom-lite.js";import"chrome://resources/mojo/url/mojom/url.mojom-lite.js";import"chrome://new-tab-page/omnibox.mojom-lite.js";import"chrome://new-tab-page/new_tab_page.mojom-lite.js";import{addSingletonGetter}from"chrome://resources/js/cr.m.js";import{B as BrowserProxy,a as assert,d as decodeString16,s as skColorToRgba,m as mojoTimeDelta,b as mojoString16,E as EventTracker,$ as $$,c as assertNotReached,e as BackgroundSelectionType,F as FocusOutlineManager,h as hexColorToSkColor,P as PromoBrowserCommandProxy}from"./shared.rollup.js";export{$ as $$,e as BackgroundSelectionType,B as BrowserProxy,I as ImgElement,P as PromoBrowserCommandProxy,f as createScrollBorders,d as decodeString16,b as mojoString16}from"./shared.rollup.js";import{loadTimeData}from"chrome://resources/js/load_time_data.m.js";import"chrome://resources/mojo/mojo/public/mojom/base/unguessable_token.mojom-lite.js";import"chrome://resources/mojo/url/mojom/origin.mojom-lite.js";import{loadKaleidoscopeModule}from"chrome://kaleidoscope/module.js";import"chrome://new-tab-page/modules/task_module/task_module.mojom-lite.js";import"chrome://new-tab-page/promo_browser_command.mojom-lite.js";// Copyright 2020 The Chromium Authors. All rights reserved.
class FakeboxElement extends PolymerElement{static get is(){return"ntp-fakebox"}static get template(){return html`<!--css-build:shadow--><!--_html_template_start_--><style scope="ntp-fakebox">:host {
  --ntp-fakebox-height: 44px;
    background-color: white;
    border-radius: calc(0.5 * var(--ntp-fakebox-height));
    box-shadow: 0 1px 6px 0 rgba(32, 33, 36, .28);
    height: var(--ntp-fakebox-height);
    position: relative;
}

:host([hidden_]) {
  visibility: hidden;
}

:host > * {
  bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
}

#controls {
  align-items: center;
    display: flex;
    flex-direction: row;
    left: 16px;
    pointer-events: none;
    right: 16px;
}

input {
  border: 0;
    opacity: 0;
    padding: 0;
    width: 100%;
}

#searchIcon {
  -webkit-mask-image: url(chrome://resources/images/icon_search.svg);
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-size: 100%;
    background-color: var(--cr-secondary-text-color);
    height: 21px;
    width: 21px;
}

@keyframes blink {
0% {
  opacity: 1;
}

61.55% {
  opacity: 0;
}

}

#fakeCursor {
  background-color: var(--cr-secondary-text-color);
    height: 1rem;
    margin-inline-start: 11px;
    visibility: hidden;
    width: 1px;
}

:host([focused_]) #fakeCursor {
  animation: blink 1.3s step-end infinite;
    visibility: visible;
}

:host([dragged_]) #fakeCursor {
  visibility: visible;
}

#hint {
  color: var(--cr-secondary-text-color);
    flex-grow: 1;
    font-size: 1rem;
    margin-inline-start: 3px;
}

:host([focused_]) #hint, :host([dragged_]) #hint {
  visibility: hidden;
}

#voiceSearchButton {
  background: url(icons/googlemic_clr_24px.svg) no-repeat center;
    background-size: 21px 21px;
    border: none;
    border-radius: 2px;
    cursor: pointer;
    height: 100%;
    outline: none;
    padding: 0;
    pointer-events: auto;
    width: 26px;
}

:host-context(.focus-outline-visible) #voiceSearchButton:focus {
  box-shadow: var(--ntp-focus-shadow);
}

</style>
<input id="input" on-pointerdown="onPointerDown_" on-paste="onPaste_" on-dragenter="onDragenter_" on-dragleave="onDragleave_" on-drop="onDrop_" autocomplete="off" tabindex="-1" type="url" aria-hidden="true">

<div id="controls">
  <div id="searchIcon"></div>
  <div id="fakeCursor"></div>
  <div id="hint">Search Google or type a URL</div>
  <button id="voiceSearchButton" on-click="onVoiceSearchClick_" title="Search by voice">
  </button>
</div>
<!--_html_template_end_-->`}static get properties(){return{focused_:{reflectToAttribute:true,type:Boolean},hidden_:{reflectToAttribute:true,type:Boolean},dragged_:{reflectToAttribute:true,type:Boolean}}}constructor(){performance.mark("fakebox-creation-start");super();this.pageHandler_=BrowserProxy.getInstance().handler;this.callbackRouter_=BrowserProxy.getInstance().callbackRouter;this.setFakeboxFocusedListenerId_=null;this.setFakeboxVisibleListenerId_=null}connectedCallback(){super.connectedCallback();this.setFakeboxFocusedListenerId_=this.callbackRouter_.setFakeboxFocused.addListener((focused=>{this.focused_=focused;this.dragged_=false}));this.setFakeboxVisibleListenerId_=this.callbackRouter_.setFakeboxVisible.addListener((visible=>{this.hidden_=!visible}))}disconnectedCallback(){super.disconnectedCallback();this.callbackRouter_.removeListener(assert(this.setFakeboxFocusedListenerId_));this.callbackRouter_.removeListener(assert(this.setFakeboxVisibleListenerId_))}ready(){super.ready();performance.measure("fakebox-creation","fakebox-creation-start")}onPointerDown_(){this.pageHandler_.focusOmnibox()}onPaste_(e){e.preventDefault();const text=e.clipboardData.getData("text/plain");if(!text){return}this.pageHandler_.pasteIntoOmnibox(text)}onDragenter_(){this.dragged_=true}onDragleave_(){this.dragged_=false}onDrop_(e){e.preventDefault();const text=e.dataTransfer.getData("text/plain");if(!text){return}this.pageHandler_.focusOmnibox();this.pageHandler_.pasteIntoOmnibox(text)}onVoiceSearchClick_(){this.dispatchEvent(new Event("open-voice-search"))}}customElements.define(FakeboxElement.is,FakeboxElement);// Copyright 2020 The Chromium Authors. All rights reserved.
class RealboxButtonElement extends PolymerElement{static get is(){return"ntp-realbox-button"}static get template(){return html`<!--css-build:shadow--><!--_html_template_start_--><style scope="ntp-realbox-button">:host {
  align-items: center;
    border-radius: 50%;
    display: flex;
    flex-shrink: 0;
    height: 24px;
    justify-content: center;
    outline: none;
    width: 24px;
}

:host([hidden]) {
  display: none;
}

:host(:hover) {
  background-color: var(--search-box-icon-bg-hovered, rgba(var(--google-grey-900-rgb), .16));
}

:host(:focus-within) {
  background-color: var(--search-box-icon-bg-focused, rgba(var(--google-grey-900-rgb), .32));
}

#icon {
  -webkit-mask-image: url(chrome://resources/images/icon_clear.svg);
    -webkit-mask-position: center;
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-size: 16px;
    height: 100%;
    width: 100%;
}

:host-context(.header) #icon {
  -webkit-mask-image: url(icons/chevron.svg);
    -webkit-transform: rotate(180deg);
    background-color: var(--search-box-icon, var(--google-grey-900));
}

:host-context(.header[group-is-hidden]) #icon {
  -webkit-transform: none;
}

:host-context(ntp-realbox-match:hover) #icon {
  background-color: var(--search-box-icon, var(--google-grey-900));
}

:host-context(ntp-realbox-match:-webkit-any(:focus-within, .selected)) #icon, :host-context(.header:focus-within) #icon {
  background-color: var(--search-box-icon-selected, var(--google-grey-900));
}

</style>
<div id="icon"></div>

<!--_html_template_end_-->`}ready(){super.ready();this.addEventListener("mousedown",this.onMouseDown_.bind(this))}onMouseDown_(e){e.preventDefault()}}customElements.define(RealboxButtonElement.is,RealboxButtonElement);// Copyright 2020 The Chromium Authors. All rights reserved.
const DOCUMENT_MATCH_TYPE="document";class RealboxIconElement extends PolymerElement{static get is(){return"ntp-realbox-icon"}static get template(){return html`<!--css-build:shadow--><!--_html_template_start_--><style scope="ntp-realbox-icon">:host {
  align-items: center;
    display: flex;
    flex-shrink: 0;
    justify-content: center;
    width: 32px;
}

#imageContainer {
  align-items: center;
    border-radius: 8px;
    display: none;
    height: 32px;
    justify-content: center;
    overflow: hidden;
    width: 32px;
}

:host-context(ntp-realbox-match[has-image]) #imageContainer {
  display: flex;
}

#image {
  max-height: 32px;
    max-width: 32px;
}

#icon {
  -webkit-mask-position: center;
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-size: 16px;
    background-color: var(--search-box-icon, var(--google-grey-refresh-700));
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 16px;
    height: 24px;
    width: 24px;
}

:host-context(ntp-realbox-match[has-image]) #icon {
  display: none;
}

:host([in-searchbox][background-image='google_g.png']) #icon {
  background-size: 12px;
}

:host([in-searchbox][mask-image='search.svg']) #icon {
  -webkit-mask-size: 20px;
}

</style>
<div id="imageContainer" style$="[[imageContainerStyle_]]">
    <img id="image" src$="[[imageSrc_]]">
</div>
<div id="icon" style$="[[iconStyle_]]">
</div>

<!--_html_template_end_-->`}static get properties(){return{backgroundImage:{type:String,computed:`computeBackgroundImage_(match.faviconDataUrl, match)`,reflectToAttribute:true},defaultIcon:{type:String,value:""},maskImage:{type:String,computed:`computeMaskImage_(match)`,reflectToAttribute:true},match:{type:Object},iconStyle_:{type:String,computed:`computeIconStyle_(backgroundImage, maskImage)`},imageContainerStyle_:{type:String,computed:`computeImageContainerStyle_(imageSrc_, match)`},imageSrc_:{type:String,computed:`computeImageSrc_(match.imageDataUrl, match)`}}}computeBackgroundImage_(){if(this.match&&!this.match.isSearchType){if(this.match.faviconDataUrl){return this.match.faviconDataUrl}else if(this.match.type===DOCUMENT_MATCH_TYPE){return this.match.iconUrl}else{return""}}else if(this.defaultIcon==="google_g.png"){return this.defaultIcon}else{return""}}computeMaskImage_(){if(this.match){return this.match.iconUrl}else{return this.defaultIcon}}computeIconStyle_(){if(this.backgroundImage){return`background-image: url(${this.backgroundImage});`+`background-color: transparent;`}else{return`-webkit-mask-image: url(${this.maskImage});`}}computeImageContainerStyle_(){return this.match&&this.match.imageDominantColor&&!this.imageSrc_?`background-color: ${this.match.imageDominantColor}40;`:"background-color: transparent;"}computeImageSrc_(){if(!this.match){return""}if(this.match.imageDataUrl){return this.match.imageDataUrl}else if(this.match.imageUrl&&this.match.imageUrl.startsWith("data:image/")){return this.match.imageUrl}else{return""}}}customElements.define(RealboxIconElement.is,RealboxIconElement);// Copyright 2020 The Chromium Authors. All rights reserved.
const ACMatchClassificationStyle={NONE:0,URL:1<<0,MATCH:1<<1,DIM:1<<2};class RealboxMatchElement extends PolymerElement{static get is(){return"ntp-realbox-match"}static get template(){return html`<!--css-build:shadow--><!--_html_template_start_--><style scope="ntp-realbox-match">:host {
  align-items: center;
    cursor: default;
    display: flex;
    font-size: 16px;
    line-height: 1;
    outline: none;
    padding-bottom: 6px;
    padding-inline-end: 16px;
    padding-inline-start: 12px;
    padding-top: 6px;
}

#container {
  align-items: center;
    display: flex;
    flex-grow: 1;
    overflow: hidden;
    padding-inline-end: 8px;
    padding-inline-start: 8px;
    white-space: nowrap;
}

#contents, #description {
  overflow: hidden;
    text-overflow: ellipsis;
}

#separator {
  white-space: pre;
}

:host([has-image]) #container {
  align-items: flex-start;
    flex-direction: column;
}

:host([has-image]) #separator {
  display: none;
}

:host([has-image]) #contents {
  width: 100%;
}

:host([has-image]) #description {
  font-size: 14px;
    line-height: 16px;
    margin-top: 2px;
    width: 100%;
}

.match {
  font-weight: 500;
}

:host([has-image]) #description, .dim {
  color: var(--search-box-results-dim, var(--google-grey-refresh-700));
}

:host-context(ntp-realbox-match:-webkit-any(:focus-within, .selected)):host([has-image]) #description, :host-context(ntp-realbox-match:-webkit-any(:focus-within, .selected)) .dim {
  color: var(--search-box-results-dim-selected, var(--google-grey-refresh-700));
}

.url {
  color: var(--search-box-results-url, var(--google-blue-refresh-700));
}

:host-context(ntp-realbox-match:-webkit-any(:focus-within, .selected)) .url {
  color: var(--search-box-results-url-selected, var(--google-blue-refresh-700));
}

</style>
<ntp-realbox-icon id="icon" match="[[match]]"></ntp-realbox-icon>
<div id="container">
  <span id="contents" inner-h-t-m-l="[[contentsHtml_]]"></span>
  <span id="separator" class="dim">[[separatorText_]]</span>
  <span id="description" inner-h-t-m-l="[[descriptionHtml_]]"></span>
</div>
<ntp-realbox-button id="remove" tabindex="0" role="button" on-click="onRemoveButtonClick_" on-keydown="onRemoveButtonKeydown_" title$="[[removeButtonTitle_]]" hidden$="[[!removeButtonIsVisible_]]">
</ntp-realbox-button>
<!--_html_template_end_-->`}static get properties(){return{ariaLabel:{type:String,computed:`computeAriaLabel_(match)`,reflectToAttribute:true},hasImage:{type:Boolean,computed:`computeHasImage_(match)`,reflectToAttribute:true},match:{type:Object},matchIndex:{type:Number,value:-1},contentsHtml_:{type:String,computed:`computeContentsHtml_(match)`},descriptionHtml_:{type:String,computed:`computeDescriptionHtml_(match)`},removeButtonIsVisible_:{type:Boolean,computed:`computeRemoveButtonIsVisible_(match)`},removeButtonTitle_:{type:String,value:()=>loadTimeData.getString("removeSuggestion")},separatorText_:{type:String,computed:`computeSeparatorText_(match)`}}}ready(){super.ready();this.addEventListener("click",this.onMatchClick_.bind(this));this.addEventListener("focusin",this.onMatchFocusin_.bind(this))}onMatchClick_(e){if(e.button>1){return}this.dispatchEvent(new CustomEvent("match-click",{bubbles:true,composed:true,detail:{index:this.matchIndex,event:e}}));e.preventDefault();e.stopPropagation()}onMatchFocusin_(e){this.dispatchEvent(new CustomEvent("match-focusin",{bubbles:true,composed:true,detail:this.matchIndex}))}onRemoveButtonClick_(e){if(e.button!==0){return}this.dispatchEvent(new CustomEvent("match-remove",{bubbles:true,composed:true,detail:this.matchIndex}));e.preventDefault();e.stopPropagation()}onRemoveButtonKeydown_(e){if(e.key!=="Enter"&&e.key!==" "){return}e.target.click();e.preventDefault()}computeAriaLabel_(){if(!this.match){return""}const contents=decodeString16(this.match.contents);const description=decodeString16(this.match.description);return this.match.swapContentsAndDescription?description+this.separatorText_+contents:contents+this.separatorText_+description}computeContentsHtml_(){if(!this.match){return""}const match=this.match;return match.swapContentsAndDescription?this.renderTextWithClassifications_(decodeString16(match.description),match.descriptionClass).innerHTML:this.renderTextWithClassifications_(decodeString16(match.contents),match.contentsClass).innerHTML}computeDescriptionHtml_(){if(!this.match){return""}const match=this.match;return match.swapContentsAndDescription?this.renderTextWithClassifications_(decodeString16(match.contents),match.contentsClass).innerHTML:this.renderTextWithClassifications_(decodeString16(match.description),match.descriptionClass).innerHTML}computeHasImage_(){return this.match&&!!this.match.imageUrl}computeRemoveButtonIsVisible_(){return this.match&&this.match.supportsDeletion}computeSeparatorText_(){return this.match&&decodeString16(this.match.description)?loadTimeData.getString("realboxSeparator"):""}convertClassificationStyleToCSSClasses_(style){const classes=[];if(style&ACMatchClassificationStyle.DIM){classes.push("dim")}if(style&ACMatchClassificationStyle.MATCH){classes.push("match")}if(style&ACMatchClassificationStyle.URL){classes.push("url")}return classes}createSpanWithClasses_(text,classes){const span=document.createElement("span");if(classes.length){span.classList.add(...classes)}span.textContent=text;return span}renderTextWithClassifications_(text,classifications){return classifications.map((({offset:offset,style:style},index)=>{const next=classifications[index+1]||{offset:text.length};const subText=text.substring(offset,next.offset);const classes=this.convertClassificationStyleToCSSClasses_(style);return this.createSpanWithClasses_(subText,classes)})).reduce(((container,currentElement)=>{container.appendChild(currentElement);return container}),document.createElement("span"))}}customElements.define(RealboxMatchElement.is,RealboxMatchElement);// Copyright 2020 The Chromium Authors. All rights reserved.
class RealboxDropdownElement extends PolymerElement{static get is(){return"ntp-realbox-dropdown"}static get template(){return html`<!--css-build:shadow--><!--_html_template_start_--><style scope="ntp-realbox-dropdown">:host {
  background-color: var(--search-box-results-bg, white);
    overflow: hidden;
}

@media (min-width: 560px) {
:host {
  width: 449px;
}

}

@media (min-width: 672px) {
:host {
  width: 561px;
}

}

ntp-realbox-match {
  color: var(--search-box-results-text);
}

.header {
  align-items: center;
    display: flex;
    margin-top: 8px;
    outline: none;
    padding-bottom: 6px;
    padding-inline-end: 16px;
    padding-inline-start: 12px;
    padding-top: 6px;
}

.header .text {
  color: var(--search-box-results-dim, var(--google-grey-refresh-700));
    cursor: default;
    font-size: 14px;
    font-weight: 500;
    line-height: 16px;
    overflow: hidden;
    padding-inline-end: 8px;
    text-overflow: ellipsis;
    text-transform: uppercase;
    user-select: none;
    white-space: nowrap;
}

ntp-realbox-match:hover, .header:hover {
  background-color: var(--search-box-results-bg-hovered, rgba(var(--google-grey-900-rgb), .1));
}

ntp-realbox-match:-webkit-any(:focus-within, .selected), .header:focus-within:not(:focus) {
  background-color: var(--search-box-results-bg-selected, rgba(var(--google-grey-900-rgb), .16));
    color: var(--search-box-results-text-selected, var(--google-grey-900));
}

</style>
<iron-selector id="selector" selectable="ntp-realbox-match" items="{{selectableMatchElements_}}" selected="{{selectedMatchIndex}}" selected-class="selected">
  <template is="dom-repeat" items="[[groupIds_]]" as="groupId">
    <template is="dom-if" if="[[groupHasHeader_(groupId)]]">
      <!-- Header cannot be tabbed into but gets focus when clicked. This stops
           the dropdown from losing focus and closing as a result. -->
      <div class="header" data-id$="[[groupId]]" tabindex="-1" on-focusin="onHeaderFocusin_" on-click="onHeaderClick_" aria-hidden="true" group-is-hidden$="[[groupIsHidden_(groupId, hiddenGroupIds_.*)]]">
        <span class="text">[[headerForGroup_(groupId)]]</span>
        <ntp-realbox-button tabindex="0" role="button" title="[[toggleButtonTitleForGroup_(groupId, hiddenGroupIds_.*)]]" aria-label$="[[toggleButtonA11yLabelForGroup_(groupId, hiddenGroupIds_.*)]]" on-keydown="onToggleButtonKeydown_">
        </ntp-realbox-button>
      </div>
    </template>
    <template is="dom-if" if="[[!groupIsHidden_(groupId, hiddenGroupIds_.*)]]" restamp="">
      <template is="dom-repeat" items="[[result.matches]]" filter="[[computeMatchBelongsToGroup_(groupId)]]" on-dom-change="onResultRepaint_">
        <ntp-realbox-match tabindex="0" role="option" match="[[item]]" match-index="[[matchIndex_(item)]]">
        </ntp-realbox-match>
      </template>
    </template>
  <template>

<!--_html_template_end_--></template></template></iron-selector>`}static get properties(){return{result:{type:Object},selectedMatchIndex:{type:Number,value:-1,notify:true},theme:{type:Object,observer:"onThemeChange_"},groupIds_:{type:Array,computed:`computeGroupIds_(result)`},hiddenGroupIds_:{type:Array,computed:`computeHiddenGroupIds_(result)`},selectableMatchElements_:{type:Array,value:()=>[]}}}constructor(){super();this.callbackRouter_=BrowserProxy.getInstance().callbackRouter;this.pageHandler_=BrowserProxy.getInstance().handler;this.autocompleteMatchImageAvailableListenerId_=null}connectedCallback(){super.connectedCallback();this.autocompleteMatchImageAvailableListenerId_=this.callbackRouter_.autocompleteMatchImageAvailable.addListener(this.onAutocompleteMatchImageAvailable_.bind(this))}disconnectedCallback(){super.disconnectedCallback();this.callbackRouter_.removeListener(assert(this.autocompleteMatchImageAvailableListenerId_))}unselect(){this.selectedMatchIndex=-1}focusSelected(){if(this.$.selector.selectedItem){this.$.selector.selectedItem.focus()}}selectFirst(){this.selectedMatchIndex=0}selectIndex(index){this.selectedMatchIndex=index}selectPrevious(){this.selectedMatchIndex=this.selectedMatchIndex-1>=0?this.selectedMatchIndex-1:this.selectableMatchElements_.length-1}selectLast(){this.selectedMatchIndex=this.selectableMatchElements_.length-1}selectNext(){this.selectedMatchIndex=this.selectedMatchIndex+1<this.selectableMatchElements_.length?this.selectedMatchIndex+1:0}onAutocompleteMatchImageAvailable_(matchIndex,url,dataUrl){if(!this.result||!this.result.matches){return}const match=this.result.matches[matchIndex];if(!match){return}if(match.destinationUrl.url===url.url){this.set(`result.matches.${matchIndex}.faviconDataUrl`,dataUrl)}else if(match.imageUrl===url.url){this.set(`result.matches.${matchIndex}.imageDataUrl`,dataUrl)}}onResultRepaint_(){this.dispatchEvent(new CustomEvent("result-repaint",{bubbles:true,composed:true,detail:window.performance.now()}))}onThemeChange_(){if(!loadTimeData.getBoolean("realboxMatchOmniboxTheme")){return}const icon=assert(this.theme.icon);const iconBgHovered={value:icon.value&704643071};const iconSelected=assert(this.theme.iconSelected);const iconBgFocused={value:iconSelected.value&1392508927};this.updateStyles({"--search-box-icon-bg-focused":skColorToRgba(iconBgFocused),"--search-box-icon-bg-hovered":skColorToRgba(iconBgHovered),"--search-box-icon-selected":skColorToRgba(iconSelected),"--search-box-icon":skColorToRgba(icon),"--search-box-results-bg-hovered":skColorToRgba(assert(this.theme.resultsBgHovered)),"--search-box-results-bg-selected":skColorToRgba(assert(this.theme.resultsBgSelected)),"--search-box-results-bg":skColorToRgba(assert(this.theme.resultsBg)),"--search-box-results-dim-selected":skColorToRgba(assert(this.theme.resultsDimSelected)),"--search-box-results-dim":skColorToRgba(assert(this.theme.resultsDim)),"--search-box-results-text-selected":skColorToRgba(assert(this.theme.resultsTextSelected)),"--search-box-results-text":skColorToRgba(assert(this.theme.resultsText)),"--search-box-results-url-selected":skColorToRgba(assert(this.theme.resultsUrlSelected)),"--search-box-results-url":skColorToRgba(assert(this.theme.resultsUrl))})}onHeaderFocusin_(){this.dispatchEvent(new CustomEvent("header-focusin",{bubbles:true,composed:true}))}onHeaderClick_(e){const groupId=Number(e.currentTarget.dataset.id);this.pageHandler_.toggleSuggestionGroupIdVisibility(groupId);const index=this.hiddenGroupIds_.indexOf(groupId);if(index===-1){this.push("hiddenGroupIds_",groupId)}else{this.splice("hiddenGroupIds_",index,1)}}onToggleButtonKeydown_(e){if(e.key!=="Enter"&&e.key!==" "){return}e.target.click();e.preventDefault()}matchIndex_(match){if(!this.result||!this.result.matches){return-1}return this.result.matches.indexOf(match)}computeGroupIds_(){if(!this.result||!this.result.matches){return[]}return[...new Set(this.result.matches.map((match=>match.suggestionGroupId)))]}computeHiddenGroupIds_(){if(!this.result){return[]}return Object.keys(this.result.suggestionGroupsMap).map((groupId=>Number(groupId))).filter((groupId=>this.result.suggestionGroupsMap[groupId].hidden).bind(this))}computeMatchBelongsToGroup_(groupId){return match=>match.suggestionGroupId===groupId}groupHasHeader_(groupId){return!!this.headerForGroup_(groupId)}groupIsHidden_(groupId){return this.hiddenGroupIds_.indexOf(groupId)!==-1}headerForGroup_(groupId){return this.result&&this.result.suggestionGroupsMap&&this.result.suggestionGroupsMap[groupId]?decodeString16(this.result.suggestionGroupsMap[groupId].header):""}toggleButtonTitleForGroup_(groupId){if(!this.groupHasHeader_(groupId)){return""}return loadTimeData.getString(this.groupIsHidden_(groupId)?"showSuggestions":"hideSuggestions")}toggleButtonA11yLabelForGroup_(groupId){if(!this.groupHasHeader_(groupId)){return""}return loadTimeData.substituteString(loadTimeData.getString(this.groupIsHidden_(groupId)?"showSection":"hideSection"),this.headerForGroup_(groupId))}}customElements.define(RealboxDropdownElement.is,RealboxDropdownElement);// Copyright 2020 The Chromium Authors. All rights reserved.
class RealboxElement extends PolymerElement{static get is(){return"ntp-realbox"}static get template(){return html`<!--css-build:shadow--><!--_html_template_start_--><style scope="ntp-realbox">:host {
  --ntp-realbox-height: 44px;
    border-radius: calc(0.5 * var(--ntp-realbox-height));
    box-shadow: 0 1px 6px 0 rgba(32, 33, 36, .28);
    height: var(--ntp-realbox-height);
}

:host([matches-are-visible]) {
  box-shadow: none;
}

#inputWrapper {
  height: 100%;
    position: relative;
}

input {
  background-color: var(--search-box-bg, white);
    border: none;
    border-radius: calc(0.5 * var(--ntp-realbox-height));
    color: var(--search-box-text);
    font-size: 16px;
    height: 100%;
    outline: none;
    padding-inline-end:  40px;
    padding-inline-start: 52px;
    position: relative;
    width: 100%;
}

input::-webkit-search-decoration, input::-webkit-search-cancel-button, input::-webkit-search-results-button, input::-webkit-search-results-decoration {
  display: none;
}

input::placeholder {
  color: var(--search-box-placeholder, var(--google-grey-refresh-700));
}

input:focus::placeholder {
  color: transparent;
}

input:focus, :host([matches-are-visible]) input {
  background-color: var(--search-box-results-bg, white);
}

ntp-realbox-icon {
  height: 100%;
    left: 12px;
    position: absolute;
    top: 0;
}

:host-context([dir='rtl']) ntp-realbox-icon {
  left: unset;
    right: 12px;
}

#voiceSearchButton {
  background: url(icons/googlemic_clr_24px.svg) no-repeat center;
    background-size: 21px 21px;
    border: none;
    border-radius: 2px;
    cursor: pointer;
    height: 100%;
    outline: none;
    padding: 0;
    pointer-events: auto;
    position: absolute;
    right: 16px;
    width: 26px;
}

:host-context([dir='rtl']) #voiceSearchButton {
  left: 16px;
    right: unset;
}

:host-context(.focus-outline-visible) #voiceSearchButton:focus {
  box-shadow: var(--ntp-focus-shadow);
}

:-webkit-any(input, ntp-realbox-icon, #voiceSearchButton) {
  z-index: 2;
}

ntp-realbox-dropdown {
  border-radius: calc(0.25 * var(--ntp-realbox-height));
    box-shadow: 0 1px 6px 0 rgba(32, 33, 36, .28);
    left: 0;
    padding-bottom: 8px;
    padding-top: var(--ntp-realbox-height);
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;
}

</style>
<div id="inputWrapper" on-focusout="onInputWrapperFocusout_" on-keydown="onInputWrapperKeydown_">
  <input id="input" type="search" autocomplete="off" spellcheck="false" aria-live="polite" placeholder="Search Google or type a URL" on-copy="onInputCutCopy_" on-cut="onInputCutCopy_" on-focus="onInputFocus_" on-input="onInputInput_" on-keydown="onInputKeydown_" on-keyup="onInputKeyup_" on-mousedown="onInputMouseDown_" on-paste="onInputPaste_">
  <ntp-realbox-icon id="icon" match="[[selectedMatch_]]" default-icon="[[realboxIcon_]]" in-searchbox="">
  </ntp-realbox-icon>
  <button id="voiceSearchButton" on-click="onVoiceSearchClick_" title="Search by voice">
  </button>
  <ntp-realbox-dropdown id="matches" role="listbox" theme="[[theme]]" result="[[result_]]" selected-match-index="{{selectedMatchIndex_}}" on-result-repaint="onResultRepaint_" on-match-focusin="onMatchFocusin_" on-match-click="onMatchClick_" on-match-remove="onMatchRemove_" on-header-focusin="onHeaderFocusin_" hidden$="[[!matchesAreVisible]]">
  </ntp-realbox-dropdown>
</div>
<!--_html_template_end_-->`}static get properties(){return{matchesAreVisible:{type:Boolean,value:false,reflectToAttribute:true},theme:{type:Object,observer:"onThemeChange_"},charTypedTime_:{type:Number,value:0},isDeletingInput_:{type:Boolean,value:false},lastIgnoredEnterEvent_:{type:Object,value:null},lastInput_:{type:Object,value:{text:"",inline:""}},lastInputFocusTime_:{type:Number,value:null},lastQueriedInput_:{type:String,value:null},pastedInInput_:{type:Boolean,value:false},realboxIcon_:{type:String,value:()=>loadTimeData.getString("realboxDefaultIcon")},result_:{type:Object},selectedMatch_:{type:Object,computed:`computeSelectedMatch_(result_, selectedMatchIndex_)`},selectedMatchIndex_:{type:Number,value:-1}}}constructor(){performance.mark("realbox-creation-start");super();this.pageHandler_=BrowserProxy.getInstance().handler;this.callbackRouter_=BrowserProxy.getInstance().callbackRouter;this.autocompleteResultChangedListenerId_=null;this.autocompleteMatchImageAvailableListenerId_=null}connectedCallback(){super.connectedCallback();this.autocompleteResultChangedListenerId_=this.callbackRouter_.autocompleteResultChanged.addListener(this.onAutocompleteResultChanged_.bind(this));this.autocompleteMatchImageAvailableListenerId_=this.callbackRouter_.autocompleteMatchImageAvailable.addListener(this.onAutocompleteMatchImageAvailable_.bind(this))}disconnectedCallback(){super.disconnectedCallback();this.callbackRouter_.removeListener(assert(this.autocompleteResultChangedListenerId_));this.callbackRouter_.removeListener(assert(this.autocompleteMatchImageAvailableListenerId_))}ready(){super.ready();performance.measure("realbox-creation","realbox-creation-start")}onAutocompleteMatchImageAvailable_(matchIndex,url,dataUrl){if(!this.result_||!this.result_.matches){return}const match=this.result_.matches[matchIndex];if(!match||this.selectedMatchIndex_!==matchIndex){return}if(match.destinationUrl.url===url.url){match.faviconDataUrl=dataUrl;this.notifyPath("selectedMatch_.faviconDataUrl")}}onAutocompleteResultChanged_(result){if(this.lastQueriedInput_===null||this.lastQueriedInput_.trimLeft()!==decodeString16(result.input)){return}this.result_=result;const hasMatches=result&&result.matches&&result.matches.length>0;this.matchesAreVisible=hasMatches;this.$.input.focus();const firstMatch=hasMatches?this.result_.matches[0]:null;if(firstMatch&&firstMatch.allowedToBeDefaultMatch){this.$.matches.selectFirst();this.updateInput_({inline:decodeString16(firstMatch.inlineAutocompletion)});if(this.lastIgnoredEnterEvent_){this.navigateToMatch_(0,this.lastIgnoredEnterEvent_);this.lastIgnoredEnterEvent_=null}}else if(hasMatches&&this.selectedMatchIndex_!==-1&&this.selectedMatchIndex_<this.result_.matches.length){this.$.matches.selectIndex(this.selectedMatchIndex_);this.updateInput_({text:decodeString16(this.selectedMatch_.fillIntoEdit),inline:"",moveCursorToEnd:true})}else{this.$.matches.unselect();this.updateInput_({inline:""})}}onThemeChange_(){if(!loadTimeData.getBoolean("realboxMatchOmniboxTheme")){return}this.updateStyles({"--search-box-bg":skColorToRgba(assert(this.theme.bg)),"--search-box-placeholder":skColorToRgba(assert(this.theme.placeholder)),"--search-box-results-bg":skColorToRgba(assert(this.theme.resultsBg)),"--search-box-text":skColorToRgba(assert(this.theme.text)),"--search-box-icon":skColorToRgba(assert(this.theme.icon))})}onHeaderFocusin_(){assert(this.lastQueriedInput_==="");this.$.matches.unselect();this.updateInput_({text:"",inline:""})}onInputCutCopy_(e){if(!this.$.input.value||this.$.input.selectionStart!==0||this.$.input.selectionEnd!==this.$.input.value.length||!this.result_||this.result_.matches.length===0){return}if(this.selectedMatch_&&!this.selectedMatch_.isSearchType){e.clipboardData.setData("text/plain",this.selectedMatch_.destinationUrl.url);e.preventDefault();if(e.type==="cut"){this.$.input.value=""}}}onInputFocus_(){this.lastInputFocusTime_=window.performance.now()}onInputInput_(){const inputValue=this.$.input.value;this.updateInput_({text:inputValue,inline:""});const charTyped=!this.isDeletingInput_&&!!inputValue.trim();this.charTypedTime_=charTyped?this.charTypedTime_||window.performance.now():0;if(inputValue.trim()){this.queryAutocomplete_(inputValue)}else{this.matchesAreVisible=false;this.clearAutocompleteMatches_()}this.pastedInInput_=false}onInputKeydown_(e){if(!this.lastInput_.inline){return}const inputValue=this.$.input.value;const inputSelection=inputValue.substring(this.$.input.selectionStart,this.$.input.selectionEnd);const lastInputValue=this.lastInput_.text+this.lastInput_.inline;if(inputSelection===this.lastInput_.inline&&inputValue===lastInputValue&&this.lastInput_.inline[0].toLocaleLowerCase()===e.key.toLocaleLowerCase()){this.updateInput_({text:assert(this.lastInput_.text+e.key),inline:this.lastInput_.inline.substr(1)});this.charTypedTime_=this.charTypedTime_||window.performance.now();this.queryAutocomplete_(this.lastInput_.text);e.preventDefault()}}onInputKeyup_(e){if(e.key!=="Tab"){return}if(!this.$.input.value){this.queryAutocomplete_("")}}onInputMouseDown_(e){if(e.button!==0){return}if(!this.$.input.value){this.queryAutocomplete_("")}}onInputPaste_(e){this.pastedInInput_=true}onInputWrapperFocusout_(e){const relatedTarget=e.relatedTarget;if(!this.$.inputWrapper.contains(relatedTarget)){if(this.lastQueriedInput_===""){this.$.matches.unselect();this.updateInput_({text:"",inline:""})}this.matchesAreVisible=false;this.pageHandler_.stopAutocomplete(false)}}onInputWrapperKeydown_(e){const KEYDOWN_HANDLED_KEYS=["ArrowDown","ArrowUp","Delete","Enter","Escape","PageDown","PageUp"];if(!KEYDOWN_HANDLED_KEYS.includes(e.key)){return}if(e.defaultPrevented){return}if(!this.matchesAreVisible){if(e.key==="ArrowUp"||e.key==="ArrowDown"){const inputValue=this.$.input.value;if(inputValue.trim()||!inputValue){this.queryAutocomplete_(inputValue)}e.preventDefault();return}}if(!this.result_||this.result_.matches.length===0){return}if(e.key==="Enter"){if([this.$.matches,this.$.input].includes(e.target)){if(this.lastQueriedInput_===decodeString16(this.result_.input)){if(this.selectedMatch_){this.navigateToMatch_(this.selectedMatchIndex_,e)}}else{this.lastIgnoredEnterEvent_=e;e.preventDefault()}}return}if(e.key==="Delete"){if(e.shiftKey&&!e.altKey&&!e.ctrlKey&&!e.metaKey){if(this.selectedMatch_&&this.selectedMatch_.supportsDeletion){this.pageHandler_.deleteAutocompleteMatch(this.selectedMatchIndex_);e.preventDefault()}}return}if(e.altKey||e.ctrlKey||e.metaKey||e.shiftKey){return}if(e.key==="Escape"&&this.selectedMatchIndex_===0){this.updateInput_({text:"",inline:""});this.matchesAreVisible=false;this.clearAutocompleteMatches_();e.preventDefault();return}if(e.key==="ArrowDown"){this.$.matches.selectNext()}else if(e.key==="ArrowUp"){this.$.matches.selectPrevious()}else if(e.key==="Escape"||e.key==="PageUp"){this.$.matches.selectFirst()}else if(e.key==="PageDown"){this.$.matches.selectLast()}e.preventDefault();if(this.shadowRoot.activeElement===this.$.matches){this.$.matches.focusSelected()}const newFill=decodeString16(this.selectedMatch_.fillIntoEdit);const newInline=this.selectedMatch_.allowedToBeDefaultMatch?decodeString16(this.selectedMatch_.inlineAutocompletion):"";const newFillEnd=newFill.length-newInline.length;this.updateInput_({text:assert(newFill.substr(0,newFillEnd)),inline:newInline,moveCursorToEnd:newInline.length===0})}onMatchClick_(e){this.navigateToMatch_(e.detail.index,e.detail.event)}onMatchFocusin_(e){this.$.matches.selectIndex(e.detail);this.updateInput_({text:decodeString16(this.selectedMatch_.fillIntoEdit),inline:"",moveCursorToEnd:true})}onMatchRemove_(e){this.pageHandler_.deleteAutocompleteMatch(e.detail)}onResultRepaint_(e){if(this.charTypedTime_){this.pageHandler_.logCharTypedToRepaintLatency(mojoTimeDelta(e.detail-this.charTypedTime_));this.charTypedTime_=0}}onVoiceSearchClick_(){this.dispatchEvent(new Event("open-voice-search"))}computeSelectedMatch_(){if(!this.result_||!this.result_.matches){return null}return this.result_.matches[this.selectedMatchIndex_]||null}clearAutocompleteMatches_(){this.result_=null;this.$.matches.unselect();this.pageHandler_.stopAutocomplete(true);this.lastQueriedInput_=null}navigateToMatch_(matchIndex,e){assert(matchIndex>=0);const match=assert(this.result_.matches[matchIndex]);assert(this.lastInputFocusTime_);const delta=mojoTimeDelta(window.performance.now()-this.lastInputFocusTime_);this.pageHandler_.openAutocompleteMatch(matchIndex,match.destinationUrl,this.matchesAreVisible,delta,e.button||0,e.altKey,e.ctrlKey,e.metaKey,e.shiftKey);e.preventDefault()}queryAutocomplete_(input){this.lastQueriedInput_=input;const caretNotAtEnd=this.$.input.selectionStart!==input.length;const preventInlineAutocomplete=this.isDeletingInput_||this.pastedInInput_||caretNotAtEnd;this.pageHandler_.queryAutocomplete(mojoString16(input),preventInlineAutocomplete)}updateInput_(update){const newInput=Object.assign({},this.lastInput_,update);const newInputValue=newInput.text+newInput.inline;const lastInputValue=this.lastInput_.text+this.lastInput_.inline;const inlineDiffers=newInput.inline!==this.lastInput_.inline;const preserveSelection=!inlineDiffers&&!update.moveCursorToEnd;let needsSelectionUpdate=!preserveSelection;const oldSelectionStart=this.$.input.selectionStart;const oldSelectionEnd=this.$.input.selectionEnd;if(newInputValue!==this.$.input.value){this.$.input.value=newInputValue;needsSelectionUpdate=true}if(newInputValue.trim()&&needsSelectionUpdate){this.$.input.selectionStart=preserveSelection?oldSelectionStart:update.moveCursorToEnd?newInputValue.length:newInput.text.length;this.$.input.selectionEnd=preserveSelection?oldSelectionEnd:newInputValue.length}this.isDeletingInput_=lastInputValue.length>newInputValue.length&&lastInputValue.startsWith(newInputValue);this.lastInput_=newInput}}customElements.define(RealboxElement.is,RealboxElement);// Copyright 2020 The Chromium Authors. All rights reserved.
const FACEBOOK_APP_ID=738026486351791;class DoodleShareDialogElement extends PolymerElement{static get is(){return"ntp-doodle-share-dialog"}static get template(){return html`<!--css-build:shadow--><!--_html_template_start_--><style scope="ntp-doodle-share-dialog">#dialog::part(dialog) {
  max-width: 300px;
}

#buttons {
  display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 28px;
    margin-top: 20px;
}

#buttons cr-button {
  background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    border: none;
    height: 48px;
    min-width: 48px;
    width: 48px;
}

#buttons cr-button:hover {
  opacity: 0.8;
}

#buttons > :not(:last-child) {
  margin-inline-end: 12px;
}

#facebookButton {
  background-image: url(icons/facebook.svg);
}

#twitterButton {
  background-image: url(icons/twitter.svg);
}

#emailButton {
  background-image: url(icons/mail.svg);
}

#url {
  --cr-input-error-display: none;
}

#copyButton {
  --cr-icon-image: url(icons/copy.svg);
    margin-inline-start: 2px;
}

</style>
<cr-dialog id="dialog" show-on-attach="">
  <div id="title" slot="title">
    [[title]]
  </div>
  <div slot="body">
    <div id="buttons">
      <cr-button id="facebookButton" title="Facebook" on-click="onFacebookClick_">
      </cr-button>
      <cr-button id="twitterButton" title="Twitter" on-click="onTwitterClick_">
      </cr-button>
      <cr-button id="emailButton" title="E-mail" on-click="onEmailClick_">
      </cr-button>
    </div>
    <cr-input readonly="" label="Doodle Link" id="url" value="[[url.url]]">
      <cr-icon-button id="copyButton" slot="suffix" title="Copy Link" on-click="onCopyClick_">
      </cr-icon-button>
    </cr-input>
  </div>
  <div slot="button-container">
    <cr-button id="doneButton" class="action-button" on-click="onCloseClick_">
      Done
    </cr-button>
  </div>
</cr-dialog>
<!--_html_template_end_-->`}static get properties(){return{title:String,url:Object}}onFacebookClick_(){const url="https://www.facebook.com/dialog/share"+`?app_id=${FACEBOOK_APP_ID}`+`&href=${encodeURIComponent(this.url.url)}`+`&hashtag=${encodeURIComponent("#GoogleDoodle")}`;BrowserProxy.getInstance().open(url);this.notifyShare_(newTabPage.mojom.DoodleShareChannel.kFacebook)}onTwitterClick_(){const url="https://twitter.com/intent/tweet"+`?text=${encodeURIComponent(`${this.title}\n${this.url.url}`)}`;BrowserProxy.getInstance().open(url);this.notifyShare_(newTabPage.mojom.DoodleShareChannel.kTwitter)}onEmailClick_(){const url=`mailto:?subject=${encodeURIComponent(this.title)}`+`&body=${encodeURIComponent(this.url.url)}`;BrowserProxy.getInstance().navigate(url);this.notifyShare_(newTabPage.mojom.DoodleShareChannel.kEmail)}onCopyClick_(){this.$.url.select();navigator.clipboard.writeText(this.url.url);this.notifyShare_(newTabPage.mojom.DoodleShareChannel.kLinkCopy)}onCloseClick_(){this.$.dialog.close()}notifyShare_(channel){this.dispatchEvent(new CustomEvent("share",{detail:channel}))}}customElements.define(DoodleShareDialogElement.is,DoodleShareDialogElement);// Copyright 2020 The Chromium Authors. All rights reserved.
const SHARE_BUTTON_SIZE_PX=26;class LogoElement extends PolymerElement{static get is(){return"ntp-logo"}static get template(){return html`<!--css-build:shadow--><!--_html_template_start_--><style include="cr-hidden-style" scope="ntp-logo">:host {
  --ntp-logo-height: 200px;
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    justify-content: flex-end;
    min-height: var(--ntp-logo-height);
}

:host([doodle-boxed_]) {
  justify-content: flex-end;
}

#logo {
  height: 92px;
    width: 272px;
}

:host([single-colored]) #logo {
  -webkit-mask-image: url(./icons/google_logo.svg);
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-size: 100%;
    background-color: var(--ntp-logo-color);
}

:host(:not([single-colored])) #logo {
  background-image: url(./icons/google_logo.svg);
}

#imageDoodle {
  cursor: pointer;
    outline: none;
}

:host([doodle-boxed_]) #imageDoodle {
  background-color: var(--ntp-logo-box-color);
    border-radius: 20px;
    padding: 16px 24px;
}

:host-context(.focus-outline-visible) #imageDoodle:focus {
  box-shadow: 0 0 0 2px rgba(var(--google-blue-600-rgb), .4);
}

#imageContainer {
  display: flex;
    height: fit-content;
    position: relative;
    width: fit-content;
}

#image {
  max-height: var(--ntp-logo-height);
    max-width: 100%;
}

:host([doodle-boxed_]) #image {
  max-height: 160px;
}

#animation {
  height: 100%;
    pointer-events: none;
    position: absolute;
    width: 100%;
}

#shareButton {
  background-color: var(--ntp-logo-share-button-background-color, none);
    border: none;
    height: var(--ntp-logo-share-button-height, 0);
    left: var(--ntp-logo-share-button-x, 0);
    min-width: var(--ntp-logo-share-button-width, 0);
    opacity: 0.8;
    outline: initial;
    padding: 2px;
    position: absolute;
    top: var(--ntp-logo-share-button-y, 0);
    width: var(--ntp-logo-share-button-width, 0);
}

#shareButton:hover {
  opacity: 1;
}

#shareButton img {
  height: 100%;
    width: 100%;
}

#iframe {
  border: none;
    height: var(--height, var(--ntp-logo-height));
    transition-duration: var(--duration, 100ms);
    transition-property: height, width;
    width: var(--width, 100%);
}

#iframe:not([expanded]) {
  max-height: var(--ntp-logo-height);
}

</style>

<template is="dom-if" if="[[showLogo_]]" restamp="">
  <div id="logo"></div>
</template>
<template is="dom-if" if="[[showDoodle_]]" restamp="">
  <div id="doodle" title="[[doodle_.description]]">
    <div id="imageDoodle" hidden="[[!imageDoodle_]]" tabindex="0" on-click="onImageClick_" on-keydown="onImageKeydown_">
      <div id="imageContainer">
        <!-- The static image is always visible and the animated image is
             stacked on top of the static image so that there is no flicker
             when starting the animation. -->
        <img id="image" src="[[imageUrl_]]" on-load="onImageLoad_">
        <ntp-iframe id="animation" src="[[animationUrl_]]" hidden="[[!showAnimation_]]">
        </ntp-iframe>
        <cr-button id="shareButton" title="Share Doodle" on-click="onShareButtonClick_" hidden="[[!imageDoodle_.shareButton]]">
          <img id="shareButtonImage" src="[[imageDoodle_.shareButton.iconUrl.url]]">
          
        </cr-button>
      </div>
    </div>
    <template is="dom-if" if="[[iframeUrl_]]" restamp="">
      <ntp-iframe id="iframe" src="[[iframeUrl_]]" expanded$="[[expanded_]]">
      </ntp-iframe>
    </template>
  </div>
</template>
<template is="dom-if" if="[[showShareDialog_]]" restamp="">
  <ntp-doodle-share-dialog title="[[doodle_.description]]" url="[[doodle_.image.shareUrl]]" on-close="onShareDialogClose_" on-share="onShare_">
  </ntp-doodle-share-dialog>
</template>
<!--_html_template_end_-->`}static get properties(){return{doodleAllowed:{reflectToAttribute:true,type:Boolean,value:true},singleColored:{reflectToAttribute:true,type:Boolean,value:false},dark:{observer:"onDarkChange_",type:Boolean},backgroundColor:Object,loaded_:Boolean,doodle_:Object,imageDoodle_:{observer:"onImageDoodleChange_",computed:"computeImageDoodle_(dark, doodle_)",type:Object},canShowDoodle_:{computed:"computeCanShowDoodle_(doodle_, imageDoodle_)",type:Boolean},showLogo_:{computed:"computeShowLogo_(doodleAllowed, loaded_, canShowDoodle_)",type:Boolean},showDoodle_:{computed:"computeShowDoodle_(doodleAllowed, loaded_, canShowDoodle_)",type:Boolean},doodleBoxed_:{reflectToAttribute:true,type:Boolean,computed:"computeDoodleBoxed_(backgroundColor, imageDoodle_)"},imageUrl_:{computed:"computeImageUrl_(imageDoodle_)",type:String},showAnimation_:{type:Boolean,value:false},animationUrl_:{computed:"computeAnimationUrl_(imageDoodle_)",type:String},iframeUrl_:{computed:"computeIframeUrl_(doodle_)",type:String},duration_:{observer:"onDurationHeightWidthChange_",type:String},height_:{observer:"onDurationHeightWidthChange_",type:String},width_:{observer:"onDurationHeightWidthChange_",type:String},expanded_:Boolean,showShareDialog_:Boolean}}constructor(){performance.mark("logo-creation-start");super();this.eventTracker_=new EventTracker;this.pageHandler_=BrowserProxy.getInstance().handler;this.pageHandler_.getDoodle().then((({doodle:doodle})=>{this.doodle_=doodle;this.loaded_=true;if(this.doodle_&&this.doodle_.interactive){this.width_=`${this.doodle_.interactive.width}px`;this.height_=`${this.doodle_.interactive.height}px`}}));this.imageClickParams_=null;this.interactionLogUrl_=null;this.shareId_=null}connectedCallback(){super.connectedCallback();this.eventTracker_.add(window,"message",(({data:data})=>{if(data["cmd"]==="resizeDoodle"){this.duration_=assert(data.duration);this.height_=assert(data.height);this.width_=assert(data.width);this.expanded_=true}else if(data["cmd"]==="sendMode"){this.sendMode_()}}));this.sendMode_()}disconnectedCallback(){super.disconnectedCallback();this.eventTracker_.removeAll()}ready(){super.ready();performance.measure("logo-creation","logo-creation-start")}onImageDoodleChange_(){const shareButton=this.imageDoodle_&&this.imageDoodle_.shareButton;if(shareButton){const height=this.imageDoodle_.height;const width=this.imageDoodle_.width;this.updateStyles({"--ntp-logo-share-button-background-color":skColorToRgba(shareButton.backgroundColor),"--ntp-logo-share-button-height":`${SHARE_BUTTON_SIZE_PX/height*100}%`,"--ntp-logo-share-button-width":`${SHARE_BUTTON_SIZE_PX/width*100}%`,"--ntp-logo-share-button-x":`${shareButton.x/width*100}%`,"--ntp-logo-share-button-y":`${shareButton.y/height*100}%`})}else{this.updateStyles({"--ntp-logo-share-button-background-color":null,"--ntp-logo-share-button-height":null,"--ntp-logo-share-button-width":null,"--ntp-logo-share-button-x":null,"--ntp-logo-share-button-y":null})}if(this.imageDoodle_){this.updateStyles({"--ntp-logo-box-color":skColorToRgba(this.imageDoodle_.backgroundColor)})}else{this.updateStyles({"--ntp-logo-box-color":null})}this.showAnimation_=false;this.imageClickParams_=null;this.interactionLogUrl_=null;this.shareId_=null}computeImageDoodle_(){return this.doodle_&&this.doodle_.image&&(this.dark?this.doodle_.image.dark:this.doodle_.image.light)||null}computeCanShowDoodle_(){return!!this.imageDoodle_||!!this.doodle_&&!!this.doodle_.interactive&&window.navigator.onLine}computeShowLogo_(){return!this.doodleAllowed||!!this.loaded_&&!this.canShowDoodle_}computeShowDoodle_(){return!!this.doodleAllowed&&this.canShowDoodle_}computeDoodleBoxed_(){return!this.backgroundColor||!!this.imageDoodle_&&this.imageDoodle_.backgroundColor.value!==this.backgroundColor.value}onImageClick_(){if(this.isCtaImageShown_()){this.showAnimation_=true;this.pageHandler_.onDoodleImageClicked(newTabPage.mojom.DoodleImageType.kCta,this.interactionLogUrl_);this.logImageRendered_(newTabPage.mojom.DoodleImageType.kAnimation,this.imageDoodle_.animationImpressionLogUrl);return}this.pageHandler_.onDoodleImageClicked(this.showAnimation_?newTabPage.mojom.DoodleImageType.kAnimation:newTabPage.mojom.DoodleImageType.kStatic,null);const onClickUrl=new URL(this.doodle_.image.onClickUrl.url);if(this.imageClickParams_){for(const param of new URLSearchParams(this.imageClickParams_)){onClickUrl.searchParams.append(param[0],param[1])}}BrowserProxy.getInstance().open(onClickUrl.toString())}onImageLoad_(){this.logImageRendered_(this.isCtaImageShown_()?newTabPage.mojom.DoodleImageType.kCta:newTabPage.mojom.DoodleImageType.kStatic,this.imageDoodle_.imageImpressionLogUrl)}async logImageRendered_(type,logUrl){const{imageClickParams:imageClickParams,interactionLogUrl:interactionLogUrl,shareId:shareId}=await this.pageHandler_.onDoodleImageRendered(type,BrowserProxy.getInstance().now(),logUrl);this.imageClickParams_=imageClickParams;this.interactionLogUrl_=interactionLogUrl;this.shareId_=shareId}onImageKeydown_(e){if([" ","Enter"].includes(e.key)){this.onImageClick_()}}onShare_(e){const doodleId=new URL(this.doodle_.image.onClickUrl.url).searchParams.get("ct");if(!doodleId){return}this.pageHandler_.onDoodleShared(e.detail,doodleId,this.shareId_)}isCtaImageShown_(){return!this.showAnimation_&&!!this.imageDoodle_.animationUrl}sendMode_(){const iframe=$$(this,"#iframe");if(!loadTimeData.getBoolean("themeModeDoodlesEnabled")||this.dark===undefined||!iframe){return}iframe.postMessage({cmd:"changeMode",dark:this.dark})}onDarkChange_(){this.sendMode_()}computeImageUrl_(){return this.imageDoodle_?this.imageDoodle_.imageUrl.url:""}computeAnimationUrl_(){return this.imageDoodle_&&this.imageDoodle_.animationUrl?`chrome-untrusted://new-tab-page/image?${this.imageDoodle_.animationUrl.url}`:""}computeIframeUrl_(){if(this.doodle_&&this.doodle_.interactive){const url=new URL(this.doodle_.interactive.url.url);if(loadTimeData.getBoolean("themeModeDoodlesEnabled")){url.searchParams.append("theme_messages","0")}return url.href}else{return""}}onShareButtonClick_(e){e.stopPropagation();this.showShareDialog_=true}onShareDialogClose_(){this.showShareDialog_=false}onDurationHeightWidthChange_(){this.updateStyles({"--duration":this.duration_,"--height":this.height_,"--width":this.width_})}}customElements.define(LogoElement.is,LogoElement);// Copyright 2020 The Chromium Authors. All rights reserved.
class ModuleDescriptor{constructor(id,heightPx,initializeCallback){this.id_=id;this.heightPx_=heightPx;this.title_=null;this.element_=null;this.initializeCallback_=initializeCallback;this.actions_=null}get id(){return this.id_}get heightPx(){return this.heightPx_}get title(){return this.title_}get element(){return this.element_}get actions(){return this.actions_}async initialize(){const info=await this.initializeCallback_();if(!info){return}this.title_=info.title;this.element_=info.element;this.actions_=info.actions||null;BrowserProxy.getInstance().handler.onModuleLoaded(this.id_,BrowserProxy.getInstance().now())}}// Copyright 2020 The Chromium Authors. All rights reserved.
class ModuleWrapperElement extends PolymerElement{static get is(){return"ntp-module-wrapper"}static get template(){return html`<!--css-build:shadow--><!--_html_template_start_--><style include="cr-icons" scope="ntp-module-wrapper">:host {
  background-color: var(--ntp-background-override-color);
    border: solid var(--ntp-border-color) 1px;
    border-radius: 5px;
    box-sizing: border-box;
    display: block;
    overflow: hidden;
}

#header {
  align-items: center;
    display: flex;
    height: 22px;
    margin: 16px;
}

#title {
  color: var(--cr-primary-text-color);
    font-size: 15px;
}

#headerSpacer {
  flex-grow: 1;
}

#infoButton {
  --cr-icon-image: url(./icons/info.svg);
}

#dismissButton {
  --cr-icon-button-margin-start: 4px;
}

#moduleElement {
  align-items: center;
    display: flex;
    justify-content: center;
}

</style>
<div id="header">
  <span id="title">[[descriptor.title]]</span>
  <div id="headerSpacer"></div>
  <template is="dom-if" if="[[descriptor.actions.info]]">
    <cr-icon-button id="infoButton" title="Why am I seeing this?" on-click="onInfoButtonClick_">
    </cr-icon-button>
  </template>
  <template is="dom-if" if="[[descriptor.actions.dismiss]]">
    <cr-icon-button id="dismissButton" title="Remove" class="icon-clear" on-click="onDismissButtonClick_">
    </cr-icon-button>
  </template>
</div>
<div id="moduleElement"></div>
<!--_html_template_end_-->`}static get properties(){return{descriptor:{observer:"onDescriptorChange_",type:Object}}}onDescriptorChange_(newValue,oldValue){assert(!oldValue);this.$.moduleElement.appendChild(this.descriptor.element);this.$.moduleElement.style.height=`${this.descriptor.heightPx}px`;const observer=new IntersectionObserver((([{intersectionRatio:intersectionRatio}])=>{if(intersectionRatio>=.5){observer.disconnect();BrowserProxy.getInstance().handler.onModuleImpression(this.descriptor.id,BrowserProxy.getInstance().now())}}),{threshold:.5});microTask.run((()=>{observer.observe(this.$.header)}));this.descriptor.element.addEventListener("usage",(()=>{BrowserProxy.getInstance().handler.onModuleUsage(this.descriptor.id)}),{once:true})}onInfoButtonClick_(){this.descriptor.actions.info()}onDismissButtonClick_(){this.hidden=true;const message=this.descriptor.actions.dismiss();this.dispatchEvent(new CustomEvent("dismiss-module",{bubbles:true,composed:true,detail:message}))}restore(){this.hidden=false;if(this.descriptor.actions.restore){this.descriptor.actions.restore()}}}customElements.define(ModuleWrapperElement.is,ModuleWrapperElement);// Copyright 2020 The Chromium Authors. All rights reserved.
const kaleidoscopeDescriptor=new ModuleDescriptor("kaleidoscope",330,(async()=>loadKaleidoscopeModule()));// Copyright 2020 The Chromium Authors. All rights reserved.
class ModuleRegistry{constructor(){this.descriptors_=[]}registerModules(descriptors){this.descriptors_=descriptors}async initializeModules(){await Promise.all(this.descriptors_.map((d=>d.initialize())));return this.descriptors_.filter((descriptor=>!!descriptor.element))}}addSingletonGetter(ModuleRegistry);// Copyright 2020 The Chromium Authors. All rights reserved.
class TaskModuleHandlerProxy{constructor(){this.handler=taskModule.mojom.TaskModuleHandler.getRemote()}}addSingletonGetter(TaskModuleHandlerProxy);// Copyright 2020 The Chromium Authors. All rights reserved.
class TaskModuleElement extends PolymerElement{static get is(){return"ntp-task-module"}static get template(){return html`<!--css-build:shadow--><!--_html_template_start_--><style include="cr-hidden-style" scope="ntp-task-module">:host {
  box-sizing: border-box;
    display: block;
    height: 100%;
    padding-inline-end: 15px;
    padding-inline-start: 15px;
    width: 100%;
}

#taskItems {
  display: flex;
    flex-direction: row;
}

.task-item {
  border-radius: 4px;
    display: flex;
    flex-direction: column;
    outline: none;
    text-decoration: none;
    width: 120px;
}

:host-context(.focus-outline-visible) .task-item:focus {
  box-shadow: var(--ntp-focus-shadow);
}

.task-item:not([hidden]) + .task-item {
  margin-inline-start: 16px;
}

.image-background {
  border-radius: 4px;
    margin-bottom: 8px;
    width: 120px;
}

:host([shopping]) .image-background {
  background-color: rgb(22, 55, 88);
    height: 120px;
}

:host([shopping]) .image-container {
  background-color: white;
    box-sizing: border-box;
    opacity: 97%;
    padding: 10px;
}

:host([recipe]) .image-background {
  height: 100px;
}

.image-container, img {
  height: 100%;
    width: 100%;
}

:host([shopping]) img {
  object-fit: contain;
}

:host([recipe]) img {
  border-radius: 4px;
    object-fit: cover;
}

.price {
  color: var(--cr-primary-text-color);
    font-size: 13px;
    font-weight: bold;
    height: 14px;
    line-height: 15px;
    margin-bottom: 8px;
}

.name {
  color: var(--cr-primary-text-color);
    font-size: 12px;
    line-height: 20px;
    margin-bottom: 4px;
    overflow: hidden;
}

:host([shopping]) .name {
  -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    height: 40px;
}

:host([recipe]) .name {
  text-overflow: ellipsis;
    white-space: nowrap;
}

.info {
  color: var(--cr-secondary-text-color);
    font-size: 11px;
    height: 13px;
    text-overflow: ellipsis;
}

#relatedSearches {
  display: flex;
    flex-direction: row;
    margin-top: 16px;
}

.pill {
  align-items: center;
    border: solid var(--ntp-border-color) 1px;
    border-radius: 16px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    flex-shrink: 0;
    height: 32px;
    outline: none;
    text-decoration: none;
}

.pill:hover {
  background-color: var(--ntp-hover-background-color);
}

.pill:active {
  background-color: var(--ntp-active-background-color);
}

:host-context(.focus-outline-visible) .pill:focus {
  box-shadow: var(--ntp-focus-shadow);
}

.pill + .pill {
  margin-inline-start: 8px;
}

.loupe {
  -webkit-mask-image: url(search.svg);
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-size: 100%;
    background-color: var(--cr-secondary-text-color);
    height: 16px;
    margin-inline-start: 12px;
    width: 16px;
}

.search-text {
  color: var(--cr-primary-text-color);
    font-size: 13px;
    margin-inline-end: 12px;
    margin-inline-start: 8px;
}

cr-dialog::part(dialog) {
  position: fixed;
    width: 459px;
}

cr-dialog [slot='body'] div:not(:last-of-type) {
  margin-bottom: 24px;
}

cr-dialog [slot='body'] a[href] {
  color: var(--cr-link-color);
    text-decoration: none;
}

</style>
<div id="taskItems">
  <template is="dom-repeat" id="taskItemsRepeat" items="[[task.taskItems]]" on-dom-change="onDomChange_">
    <a class="task-item" href="[[item.targetUrl.url]]" on-click="onTaskItemClick_" on-auxclick="onTaskItemClick_">
      <div class="image-background">
        <div class="image-container">
          <img is="ntp-img" auto-src="[[item.imageUrl.url]]">
        </div>
      </div>
      <div class="price" hidden$="[[!item.price]]">[[item.price]]</div>
      <div class="name" title="[[item.name]]">[[item.name]]</div>
      <div class="info">[[item.info]]</div>
    </a>
  </template>
</div>
<div id="relatedSearches">
  <template is="dom-repeat" id="relatedSearchesRepeat" items="[[task.relatedSearches]]" on-dom-change="onDomChange_">
    <a class="pill" href="[[item.targetUrl.url]]" on-click="onPillClick_" on-auxclick="onPillClick_">
      <div class="loupe"></div>
      <div class="search-text">[[item.text]]</div>
    </a>
  </template>
</div>
<template is="dom-if" if="[[showInfoDialog]]" restamp="">
  <cr-dialog show-on-attach="">
    <div slot="title">Why am I seeing this?</div>
    <div slot="body">
      <div>Youâ€™re seeing this item based on your previous activity using Google services. You can see your data, delete it, and change your settings at <a href="https://myactivity.google.com/" target="_blank">myactivity.google.com</a>.</div>
      <div>Learn about the data Google collects and why at <a href="https://policies.google.com/" target="_blank">policies.google.com</a>.</div>
    </div>
    <div slot="button-container">
      <cr-button class="action-button" on-click="onCloseClick_">
        Close
      </cr-button>
    </div>
  </cr-dialog>
</template>
<!--_html_template_end_-->`}static get properties(){return{taskModuleType:{type:Number,observer:"onTaskModuleTypeChange_"},task:Object,showInfoDialog:Boolean}}constructor(){super();this.intersectionObserver_=null}onTaskModuleTypeChange_(){switch(this.taskModuleType){case taskModule.mojom.TaskModuleType.kRecipe:this.toggleAttribute("recipe");break;case taskModule.mojom.TaskModuleType.kShopping:this.toggleAttribute("shopping");break}}onTaskItemClick_(e){const index=this.$.taskItemsRepeat.indexForElement(e.target);TaskModuleHandlerProxy.getInstance().handler.onTaskItemClicked(this.taskModuleType,index);this.dispatchEvent(new Event("usage",{bubbles:true,composed:true}))}onPillClick_(e){const index=this.$.relatedSearchesRepeat.indexForElement(e.target);TaskModuleHandlerProxy.getInstance().handler.onRelatedSearchClicked(this.taskModuleType,index);this.dispatchEvent(new Event("usage",{bubbles:true,composed:true}))}onCloseClick_(){this.showInfoDialog=false}onDomChange_(){if(!this.intersectionObserver_){this.intersectionObserver_=new IntersectionObserver((entries=>{entries.forEach((({intersectionRatio:intersectionRatio,target:target})=>{target.style.visibility=intersectionRatio<1?"hidden":"visible"}));this.dispatchEvent(new Event("visibility-update"))}),{root:this,threshold:1})}else{this.intersectionObserver_.disconnect()}this.shadowRoot.querySelectorAll(".task-item, .pill").forEach((el=>this.intersectionObserver_.observe(el)))}}customElements.define(TaskModuleElement.is,TaskModuleElement);async function createModule(taskModuleType){const{task:task}=await TaskModuleHandlerProxy.getInstance().handler.getPrimaryTask(taskModuleType);if(!task){return null}const element=new TaskModuleElement;element.taskModuleType=taskModuleType;element.task=task;return{element:element,title:task.title,actions:{info:()=>{element.showInfoDialog=true},dismiss:()=>{TaskModuleHandlerProxy.getInstance().handler.dismissTask(taskModuleType,task.name);return loadTimeData.getStringF("dismissModuleToastMessage",task.name)},restore:()=>{TaskModuleHandlerProxy.getInstance().handler.restoreTask(taskModuleType,task.name)}}}}const recipeTasksDescriptor=new ModuleDescriptor("recipe_tasks",206,createModule.bind(null,taskModule.mojom.TaskModuleType.kRecipe));const shoppingTasksDescriptor=new ModuleDescriptor("shopping_tasks",270,createModule.bind(null,taskModule.mojom.TaskModuleType.kShopping));// Copyright 2020 The Chromium Authors. All rights reserved.
const descriptors=[];if(loadTimeData.getBoolean("shoppingTasksModuleEnabled")){descriptors.push(shoppingTasksDescriptor)}if(loadTimeData.getBoolean("recipeTasksModuleEnabled")){descriptors.push(recipeTasksDescriptor)}if(loadTimeData.getBoolean("kaleidoscopeModuleEnabled")){descriptors.push(kaleidoscopeDescriptor)}ModuleRegistry.getInstance().registerModules(descriptors);// Copyright 2016 The Chromium Authors. All rights reserved.
var PromiseResolver=class{constructor(){this.resolve_;this.reject_;this.isFulfilled_=false;this.promise_=new Promise(((resolve,reject)=>{this.resolve_=resolution=>{resolve(resolution);this.isFulfilled_=true};this.reject_=reason=>{reject(reason);this.isFulfilled_=true}}))}get isFulfilled(){return this.isFulfilled_}set isFulfilled(i){assertNotReached()}get promise(){return this.promise_}set promise(p){assertNotReached()}get resolve(){return this.resolve_}set resolve(r){assertNotReached()}get reject(){return this.reject_}set reject(s){assertNotReached()}};// Copyright 2020 The Chromium Authors. All rights reserved.
class LoadTimeResolver{constructor(url){this.resolver_=new PromiseResolver;this.eventTracker_=new EventTracker;this.eventTracker_.add(window,"message",(({data:data})=>{if(data.frameType==="background-image"&&data.messageType==="loaded"&&url===data.url){this.resolve_(data.time)}}))}get promise(){return this.resolver_.promise}reject(){this.resolver_.reject();this.eventTracker_.removeAll()}resolve_(loadTime){this.resolver_.resolve(loadTime);this.eventTracker_.removeAll()}}class BackgroundManager{constructor(){this.backgroundImage_=document.body.querySelector("#backgroundImage");this.loadTimeResolver_=null;this.url_=this.backgroundImage_.src}setShowBackgroundImage(show){document.body.toggleAttribute("show-background-image",show)}setBackgroundColor(color){document.body.style.backgroundColor=skColorToRgba(color)}setBackgroundImage(image){const url=new URL("chrome-untrusted://new-tab-page/custom_background_image");url.searchParams.append("url",image.url.url);if(image.url2x){url.searchParams.append("url2x",image.url2x.url)}if(image.size){url.searchParams.append("size",image.size)}if(image.repeatX){url.searchParams.append("repeatX",image.repeatX)}if(image.repeatY){url.searchParams.append("repeatY",image.repeatY)}if(image.positionX){url.searchParams.append("positionX",image.positionX)}if(image.positionY){url.searchParams.append("positionY",image.positionY)}if(url.href===this.url_){return}if(this.loadTimeResolver_){this.loadTimeResolver_.reject();this.loadTimeResolver_=null}this.backgroundImage_.contentWindow.location.replace(url.href);this.url_=url.href}getBackgroundImageLoadTime(){if(!this.loadTimeResolver_){this.loadTimeResolver_=new LoadTimeResolver(this.backgroundImage_.src);BrowserProxy.getInstance().postMessage(this.backgroundImage_,"sendLoadTime","chrome-untrusted://new-tab-page")}return this.loadTimeResolver_.promise}}addSingletonGetter(BackgroundManager);// Copyright 2020 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
const callApi=async(apiName,fnName,...args)=>{const{gbar:gbar}=window;if(!gbar){return}const api=await gbar.a[apiName]();return api[fnName].apply(api,args)};const api=[{name:"bar",apiName:"bf",fns:[["setForegroundStyle","pc"],["setBackgroundColor","pd"],["setDarkMode","pp"]]}].reduce(((topLevelApi,def)=>{topLevelApi[def.name]=def.fns.reduce(((apiPart,[name,fnName])=>{apiPart[name]=callApi.bind(null,def.apiName,fnName);return apiPart}),{});return topLevelApi}),{});const updateDarkMode=async()=>{await api.bar.setDarkMode(window.matchMedia("(prefers-color-scheme: dark)").matches);api.bar.setBackgroundColor("transparent");api.bar.setForegroundStyle(foregroundLight?1:0)};let foregroundLight=false;const oneGoogleBarApi={isForegroundLight:()=>foregroundLight,setForegroundLight:enabled=>{foregroundLight=enabled;api.bar.setForegroundStyle(foregroundLight?1:0)},trackDarkModeChanges:()=>{window.matchMedia("(prefers-color-scheme: dark)").addListener((()=>{updateDarkMode()}));updateDarkMode()}};// Copyright 2019 The Chromium Authors. All rights reserved.
function ensureLazyLoaded(){const script=document.createElement("script");script.type="module";script.src="./lazy_load.js";document.body.appendChild(script)}class AppElement extends PolymerElement{static get is(){return"ntp-app"}static get template(){return html`<!--css-build:shadow--><!--_html_template_start_--><style include="cr-shared-style" scope="ntp-app">:host {
  --ntp-theme-shortcut-background-color: rgb(229, 231, 232);
    --ntp-theme-text-color: var(--google-grey-800);
    --ntp-theme-text-shadow: none;
    --ntp-one-google-bar-height: 56px;
    --ntp-search-box-width: 337px;
}

@media (min-width: 560px) {
:host {
  --ntp-search-box-width: 449px;
}

}

@media (min-width: 672px) {
:host {
  --ntp-search-box-width: 561px;
}

}

@media (prefers-color-scheme: dark) {
:host {
  --ntp-theme-shortcut-background-color: var(--google-grey-refresh-100);
      --ntp-theme-text-color: white;
}

}

:host([show-background-image_]) {
  --ntp-theme-text-shadow: 0 0 16px rgba(0, 0, 0, .3);
}

#oneGoogleBar {
  height: 100%;
    position: absolute;
    top: 0;
    width: 100%;
}

#oneGoogleBarOverlayBackdrop {
  background: rgba(0, 0, 0, .6);
    display: none;
    height: 100%;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 999;
}

#oneGoogleBarOverlayBackdrop[show] {
  display: block;
}

#content {
  align-items: center;
    display: flex;
    flex-direction: column;
    height: calc(100vh - var(--ntp-one-google-bar-height));
    position: relative;
}

:host([iframe-one-google-bar-enabled_]) #content {
  padding-top: var(--ntp-one-google-bar-height);
}

#logo {
  margin-bottom: 38px;
    z-index: 1;
}

ntp-fakebox, ntp-realbox {
  margin-bottom: 32px;
}

ntp-fakebox, ntp-realbox, ntp-module-wrapper {
  flex-shrink: 0;
    width: var(--ntp-search-box-width);
}

:host([modules-enabled_]) ntp-middle-slot-promo {
  width: var(--ntp-search-box-width);
}

:host(:not([modules-enabled_])) ntp-middle-slot-promo {
  bottom: 16px;
    position: fixed;
}

ntp-realbox {
  visibility: hidden;
}

ntp-realbox[shown] {
  visibility: visible;
}

ntp-most-visited[dark] {
  --icon-button-color-active: var(--google-grey-refresh-300);
    --icon-button-color: white;
    --tile-hover-color: rgba(255, 255, 255, .1);
}

ntp-middle-slot-promo:not([hidden]) + ntp-module-wrapper, ntp-module-wrapper + ntp-module-wrapper {
  margin-top: 16px;
}

:host(:not([promo-and-modules-loaded_])) ntp-middle-slot-promo, :host(:not([promo-and-modules-loaded_])) ntp-module-wrapper, :host(:not([modules-visible_])) ntp-module-wrapper {
  display: none;
}

#customizeButtonSpacer {
  flex-grow: 1;
}

#customizeButtonContainer {
  align-self: flex-end;
    background-color: var(--ntp-background-override-color);
    border-radius: calc(.5 * var(--cr-button-height));
    bottom: 16px;
    margin-inline-end: 16px;
    position: sticky;
}

:host([show-background-image_]) #customizeButtonContainer {
  background-color: transparent;
}

:host([show-background-image_]) #customizeButtonContainer:hover {
  background-color: rgba(255, 255, 255, .1);
}

#customizeButton {
  border: none;
    border-radius: calc(.5 * var(--cr-button-height));
    box-shadow: 0 3px 6px rgba(0, 0, 0, .16), 0 1px 2px rgba(0, 0, 0, .23);
    font-weight: 400;
    min-width: 32px;
}

:host([show-background-image_]) #customizeButton {
  box-shadow: none;
    padding: 0;
}

:host-context(.focus-outline-visible) #customizeButton:focus {
  box-shadow: var(--ntp-focus-shadow);
}

#customizeIcon {
  -webkit-mask-image: url(icons/icon_pencil.svg);
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-size: 100%;
    background-color: var(--text-color);
    height: 16px;
    margin-inline-end: 8px;
    width: 16px;
}

:host([show-background-image_]) #customizeIcon {
  background-color: white;
    margin: 0;
}

@media (max-width: 550px) {
#customizeButton {
  padding: 0;
}

#customizeIcon {
  margin: 0;
}

#customizeText {
  display: none;
}

}

#themeAttribution {
  align-self: flex-start;
    bottom: 16px;
    color: var(--cr-secondary-text-color);
    margin-inline-start: 16px;
    position: fixed;
}

#backgroundImageAttribution {
  border-radius: 8px;
    bottom: 16px;
    color: var(--ntp-theme-text-color);
    line-height: 20px;
    max-width: 50vw;
    padding: 8px;
    position: fixed;
    text-shadow: var(--ntp-theme-text-shadow);
}

:host-context([dir='ltr']) #backgroundImageAttribution {
  left: 16px;
}

:host-context([dir='rtl']) #backgroundImageAttribution {
  right: 16px;
}

#backgroundImageAttribution:hover {
  background: rgba(var(--google-grey-900-rgb), .1);
}

#backgroundImageAttribution1Container {
  align-items: center;
    display: flex;
    flex-direction: row;
}

#linkIcon {
  -webkit-mask-image: url(icons/link.svg);
    -webkit-mask-repeat: no-repeat;
    -webkit-mask-size: 100%;
    background-color: var(--ntp-theme-text-color);
    height: 16px;
    margin-inline-end: 8px;
    width: 16px;
}

#backgroundImageAttribution1, #backgroundImageAttribution2 {
  overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

#backgroundImageAttribution1 {
  font-size: .875rem;
}

#backgroundImageAttribution2 {
  font-size: .75rem;
}

@keyframes fadein {
from {
  opacity: 0;
}

to {
  opacity: 1;
}

}

.fadein {
  animation: 100ms ease-in-out fadein;
}

svg {
  position: fixed;
}

</style>
<div id="content" style="--ntp-theme-text-color: [[rgbaOrInherit_(theme_.shortcutTextColor)]];
        --ntp-theme-shortcut-background-color:
              [[rgbaOrInherit_(theme_.shortcutBackgroundColor)]];
        --ntp-logo-color: [[rgbaOrInherit_(logoColor_)]];">
  <template is="dom-if" if="[[showIframedOneGoogleBar_]]">
    <ntp-iframe id="oneGoogleBar" src="[[oneGoogleBarIframePath_]]" hidden$="[[!oneGoogleBarLoaded_]]">
    </ntp-iframe>
  </template>
  <ntp-logo id="logo" doodle-allowed$="[[doodleAllowed_]]" single-colored$="[[singleColoredLogo_]]" dark="[[theme_.isDark]]" background-color="[[backgroundColor_]]">
  </ntp-logo>
  <ntp-fakebox id="fakebox" on-open-voice-search="onOpenVoiceSearch_" hidden$="[[realboxEnabled_]]">
  </ntp-fakebox>
  <ntp-realbox id="realbox" on-open-voice-search="onOpenVoiceSearch_" theme="[[theme_.searchBox]]" shown$="[[realboxShown_]]" hidden$="[[!realboxEnabled_]]">
  </ntp-realbox>
  <dom-if if="[[lazyRender_]]" on-dom-change="onLazyRendered_">
    <template>
      <ntp-most-visited id="mostVisited" dark$="[[theme_.isDark]]" use-white-add-icon$="[[theme_.shortcutUseWhiteAddIcon]]" use-title-pill$="[[theme_.shortcutUseTitlePill]]">
      </ntp-most-visited>
      <ntp-middle-slot-promo on-ntp-middle-slot-promo-loaded="onMiddleSlotPromoLoaded_">
      </ntp-middle-slot-promo>
      <template is="dom-repeat" items="[[moduleDescriptors_]]" id="modules" on-dom-change="onModulesLoaded_">
        <ntp-module-wrapper descriptor="[[item]]" on-dismiss-module="onDismissModule_">
        </ntp-module-wrapper>
      </template>
      <a id="backgroundImageAttribution" href="[[backgroundImageAttributionUrl_]]" hidden="[[!backgroundImageAttribution1_]]">
        <div id="backgroundImageAttribution1Container">
          <div id="linkIcon"></div>
          <div id="backgroundImageAttribution1">
            [[backgroundImageAttribution1_]]
          </div>
        </div>
        <div id="backgroundImageAttribution2" hidden="[[!backgroundImageAttribution2_]]">
          [[backgroundImageAttribution2_]]
        </div>
      </a>
      <div id="customizeButtonSpacer"></div>
      <!-- cr-button has a transparent background. This leads to incorrect
           results when a custom background is set. Therefore, wrap customize
           button in container to enfore solid background color. -->
      <div id="customizeButtonContainer">
        <cr-button id="customizeButton" on-click="onCustomizeClick_" title="Customize this page">
          <div id="customizeIcon"></div>
          <div id="customizeText" hidden$="[[showBackgroundImage_]]">
            Customize
          </div>
        </cr-button>
      </div>
      <div id="themeAttribution" hidden$="[[!theme_.backgroundImage.attributionUrl]]">
        <div>Theme created by</div>
        <img src="[[theme_.backgroundImage.attributionUrl.url]]"><img>
      </div>
    </template>
  </dom-if>
</div>
<dom-if if="[[showVoiceSearchOverlay_]]" restamp="">
  <template>
    <ntp-voice-search-overlay on-close="onVoiceSearchOverlayClose_">
    </ntp-voice-search-overlay>
  </template>
</dom-if>
<dom-if if="[[showCustomizeDialog_]]" restamp="">
  <template>
    <ntp-customize-dialog on-close="onCustomizeDialogClose_" theme="[[theme_]]" background-selection="{{backgroundSelection_}}">
    </ntp-customize-dialog>
  </template>
</dom-if>
<dom-if if="[[lazyRender_]]" restamp="">
  <template>
    <cr-toast id="dismissModuleToast" duration="10000">
      <div id="dismissModuleToastMessage">[[dismissModuleToastMessage_]]</div>
      <cr-button id="undoDismissModuleButton" aria-label="Press Ctrl+Z to undo" on-click="onUndoDismissModuleButtonClick_">
        Undo
      </cr-button>
    </cr-toast>
  </template>
</dom-if>
<div id="oneGoogleBarOverlayBackdrop"></div>
<svg>
  <defs>
    <clipPath id="oneGoogleBarClipPath">
      <!-- Set an initial non-empty clip-path so the OneGoogleBar resize events
           are processed. When the clip-path is empty, it's possible for the
           OneGoogleBar to get into a state where it does not send  the
           'overlayUpdates' message which is used to populate this
           clip-path. -->
      <rect x="0" y="0" width="1" height="1"></rect>
    </clipPath>
  </defs>
</svg>
<!--_html_template_end_-->`}static get properties(){return{iframeOneGoogleBarEnabled_:{type:Boolean,value:()=>{const params=new URLSearchParams(window.location.search);if(params.has("ogbinline")){return false}return loadTimeData.getBoolean("iframeOneGoogleBarEnabled")||params.has("ogbiframe")},reflectToAttribute:true},oneGoogleBarModalOverlaysEnabled_:{type:Boolean,value:()=>loadTimeData.getBoolean("oneGoogleBarModalOverlaysEnabled")},oneGoogleBarIframePath_:{type:String,value:()=>{const params=new URLSearchParams;params.set("paramsencoded",btoa(window.location.search.replace(/^[?]/,"&")));return`chrome-untrusted://new-tab-page/one-google-bar?${params}`}},oneGoogleBarLoaded_:{observer:"oneGoogleBarLoadedChange_",type:Boolean,value:false},oneGoogleBarDarkThemeEnabled_:{type:Boolean,computed:`computeOneGoogleBarDarkThemeEnabled_(oneGoogleBarLoaded_,\n            theme_, backgroundSelection_)`,observer:"onOneGoogleBarDarkThemeEnabledChange_"},showIframedOneGoogleBar_:{type:Boolean,value:false,computed:`computeShowIframedOneGoogleBar_(iframeOneGoogleBarEnabled_,\n            lazyRender_)`},theme_:{observer:"onThemeChange_",type:Object},showCustomizeDialog_:Boolean,showVoiceSearchOverlay_:Boolean,showBackgroundImage_:{computed:"computeShowBackgroundImage_(theme_, backgroundSelection_)",observer:"onShowBackgroundImageChange_",reflectToAttribute:true,type:Boolean},backgroundSelection_:{type:Object,value:()=>({type:BackgroundSelectionType.NO_SELECTION}),observer:"updateBackgroundImagePath_"},backgroundImageAttribution1_:{type:String,computed:`computeBackgroundImageAttribution1_(theme_,\n            backgroundSelection_)`},backgroundImageAttribution2_:{type:String,computed:`computeBackgroundImageAttribution2_(theme_,\n            backgroundSelection_)`},backgroundImageAttributionUrl_:{type:String,computed:`computeBackgroundImageAttributionUrl_(theme_,\n            backgroundSelection_)`},doodleAllowed_:{computed:"computeDoodleAllowed_(showBackgroundImage_, theme_)",type:Boolean},backgroundColor_:{computed:"computeBackgroundColor_(showBackgroundImage_, theme_)",type:Object},logoColor_:{type:String,computed:"computeLogoColor_(theme_, backgroundSelection_)"},singleColoredLogo_:{computed:"computeSingleColoredLogo_(theme_, backgroundSelection_)",type:Boolean},realboxEnabled_:{type:Boolean,value:()=>loadTimeData.getBoolean("realboxEnabled")},realboxShown_:{type:Boolean,computed:"computeRealboxShown_(theme_)"},modulesEnabled_:{type:Boolean,value:()=>loadTimeData.getBoolean("modulesEnabled"),reflectToAttribute:true},modulesVisible_:{type:Boolean,reflectToAttribute:true},middleSlotPromoLoaded_:Boolean,modulesLoaded_:Boolean,promoAndModulesLoaded_:{type:Boolean,computed:`computePromoAndModulesLoaded_(middleSlotPromoLoaded_,\n            modulesLoaded_)`,reflectToAttribute:true},modulesLoadedAndVisible_:{type:Boolean,computed:`computeModulesLoadedAndVisible_(promoAndModulesLoaded_,\n            modulesVisible_)`,observer:"onModulesLoadedAndVisibleChange_"},lazyRender_:Boolean,moduleDescriptors_:Object,dismissedModuleWrapper_:{type:Object,value:null},dismissModuleToastMessage_:String}}constructor(){performance.mark("app-creation-start");super();this.callbackRouter_=BrowserProxy.getInstance().callbackRouter;this.pageHandler_=BrowserProxy.getInstance().handler;this.backgroundManager_=BackgroundManager.getInstance();this.setThemeListenerId_=null;this.setModulesVisibleListenerId_=null;this.eventTracker_=new EventTracker;this.loadOneGoogleBar_();this.shouldPrintPerformance_=new URLSearchParams(location.search).has("print_perf");this.backgroundImageLoadStartEpoch_=performance.timeOrigin;this.backgroundImageLoadStart_=0}connectedCallback(){super.connectedCallback();this.setThemeListenerId_=this.callbackRouter_.setTheme.addListener((theme=>{performance.measure("theme-set");this.theme_=theme}));this.setModulesVisibleListenerId_=this.callbackRouter_.setModulesVisible.addListener((visible=>{this.modulesVisible_=visible}));this.pageHandler_.updateModulesVisible();this.eventTracker_.add(window,"message",(event=>{const data=event.data;if(typeof data!=="object"){return}if("frameType"in data&&data.frameType==="one-google-bar"){this.handleOneGoogleBarMessage_(event)}}));this.eventTracker_.add(window,"keydown",(e=>this.onWindowKeydown_(e)));if(this.shouldPrintPerformance_){this.backgroundManager_.getBackgroundImageLoadTime().then((time=>{const duration=time-this.backgroundImageLoadStartEpoch_;this.printPerformanceDatum_("background-image-load",this.backgroundImageLoadStart_,duration);this.printPerformanceDatum_("background-image-loaded",this.backgroundImageLoadStart_+duration)}),(()=>{console.error("Failed to capture background image load time")}))}FocusOutlineManager.forDocument(document)}disconnectedCallback(){super.disconnectedCallback();this.callbackRouter_.removeListener(assert(this.setThemeListenerId_));this.eventTracker_.removeAll()}ready(){super.ready();this.pageHandler_.onAppRendered(BrowserProxy.getInstance().now());BrowserProxy.getInstance().waitForLazyRender().then((()=>{ensureLazyLoaded();this.lazyRender_=true}));this.printPerformance_();performance.measure("app-creation","app-creation-start")}computeOneGoogleBarDarkThemeEnabled_(){if(!this.theme_||!this.oneGoogleBarLoaded_){return false}switch(this.backgroundSelection_.type){case BackgroundSelectionType.IMAGE:return true;case BackgroundSelectionType.NO_BACKGROUND:case BackgroundSelectionType.DAILY_REFRESH:case BackgroundSelectionType.NO_SELECTION:default:return this.theme_.isDark}}async loadOneGoogleBar_(){if(this.iframeOneGoogleBarEnabled_){const oneGoogleBar=document.querySelector("#oneGoogleBar");if(oneGoogleBar){oneGoogleBar.remove()}return}const{parts:parts}=await this.pageHandler_.getOneGoogleBarParts(window.location.search.replace(/^[?]/,"&"));if(!parts){return}const inHeadStyle=document.createElement("style");inHeadStyle.type="text/css";inHeadStyle.appendChild(document.createTextNode(parts.inHeadStyle));document.head.appendChild(inHeadStyle);const inHeadScript=document.createElement("script");inHeadScript.type="text/javascript";inHeadScript.appendChild(document.createTextNode(parts.inHeadScript));document.head.appendChild(inHeadScript);this.oneGoogleBarLoaded_=true;const oneGoogleBar=document.querySelector("#oneGoogleBar");oneGoogleBar.innerHTML=parts.barHtml;const afterBarScript=document.createElement("script");afterBarScript.type="text/javascript";afterBarScript.appendChild(document.createTextNode(parts.afterBarScript));oneGoogleBar.parentNode.insertBefore(afterBarScript,oneGoogleBar.nextSibling);document.querySelector("#oneGoogleBarEndOfBody").innerHTML=parts.endOfBodyHtml;const endOfBodyScript=document.createElement("script");endOfBodyScript.type="text/javascript";endOfBodyScript.appendChild(document.createTextNode(parts.endOfBodyScript));document.body.appendChild(endOfBodyScript);this.pageHandler_.onOneGoogleBarRendered(BrowserProxy.getInstance().now());oneGoogleBarApi.trackDarkModeChanges()}onOneGoogleBarDarkThemeEnabledChange_(){if(!this.oneGoogleBarLoaded_){return}if(this.iframeOneGoogleBarEnabled_){$$(this,"#oneGoogleBar").postMessage({type:"enableDarkTheme",enabled:this.oneGoogleBarDarkThemeEnabled_});return}oneGoogleBarApi.setForegroundLight(this.oneGoogleBarDarkThemeEnabled_)}computeShowIframedOneGoogleBar_(){return this.iframeOneGoogleBarEnabled_&&this.lazyRender_}computeBackgroundImageAttribution1_(){switch(this.backgroundSelection_.type){case BackgroundSelectionType.NO_SELECTION:return this.theme_&&this.theme_.backgroundImageAttribution1||"";case BackgroundSelectionType.IMAGE:return this.backgroundSelection_.image.attribution1;case BackgroundSelectionType.NO_BACKGROUND:case BackgroundSelectionType.DAILY_REFRESH:default:return""}}computeBackgroundImageAttribution2_(){switch(this.backgroundSelection_.type){case BackgroundSelectionType.NO_SELECTION:return this.theme_&&this.theme_.backgroundImageAttribution2||"";case BackgroundSelectionType.IMAGE:return this.backgroundSelection_.image.attribution2;case BackgroundSelectionType.NO_BACKGROUND:case BackgroundSelectionType.DAILY_REFRESH:default:return""}}computeBackgroundImageAttributionUrl_(){switch(this.backgroundSelection_.type){case BackgroundSelectionType.NO_SELECTION:return this.theme_&&this.theme_.backgroundImageAttributionUrl?this.theme_.backgroundImageAttributionUrl.url:"";case BackgroundSelectionType.IMAGE:return this.backgroundSelection_.image.attributionUrl.url;case BackgroundSelectionType.NO_BACKGROUND:case BackgroundSelectionType.DAILY_REFRESH:default:return""}}computeRealboxShown_(){return!loadTimeData.getBoolean("realboxMatchOmniboxTheme")||!!this.theme_}computePromoAndModulesLoaded_(){return this.middleSlotPromoLoaded_&&(!loadTimeData.getBoolean("modulesEnabled")||this.modulesLoaded_)}computeModulesLoadedAndVisible_(){return this.promoAndModulesLoaded_&&this.modulesVisible_}async onLazyRendered_(){if(!loadTimeData.getBoolean("modulesEnabled")){return}this.moduleDescriptors_=await ModuleRegistry.getInstance().initializeModules()}onOpenVoiceSearch_(){this.showVoiceSearchOverlay_=true;this.pageHandler_.onVoiceSearchAction(newTabPage.mojom.VoiceSearchAction.kActivateSearchBox)}onCustomizeClick_(){this.showCustomizeDialog_=true}onCustomizeDialogClose_(){this.showCustomizeDialog_=false}onVoiceSearchOverlayClose_(){this.showVoiceSearchOverlay_=false}onWindowKeydown_(e){let ctrlKeyPressed=e.ctrlKey;if(ctrlKeyPressed&&e.code==="Period"&&e.shiftKey){this.showVoiceSearchOverlay_=true;this.pageHandler_.onVoiceSearchAction(newTabPage.mojom.VoiceSearchAction.kActivateKeyboard)}if(ctrlKeyPressed&&e.key==="z"){this.onUndoDismissModuleButtonClick_()}}rgbaOrInherit_(skColor){return skColor?skColorToRgba(skColor):"inherit"}computeShowBackgroundImage_(){switch(this.backgroundSelection_.type){case BackgroundSelectionType.NO_SELECTION:return!!this.theme_&&!!this.theme_.backgroundImage;case BackgroundSelectionType.IMAGE:return true;case BackgroundSelectionType.NO_BACKGROUND:case BackgroundSelectionType.DAILY_REFRESH:default:return false}}onShowBackgroundImageChange_(){this.backgroundManager_.setShowBackgroundImage(this.showBackgroundImage_)}onThemeChange_(){if(this.theme_){this.backgroundManager_.setBackgroundColor(this.theme_.backgroundColor)}this.updateBackgroundImagePath_()}onModulesLoadedAndVisibleChange_(){if(this.modulesLoadedAndVisible_){this.pageHandler_.onModulesRendered(BrowserProxy.getInstance().now())}}updateBackgroundImagePath_(){if(!this.showCustomizeDialog_&&this.backgroundSelection_.type!==BackgroundSelectionType.NO_SELECTION){if(this.backgroundSelection_.type===BackgroundSelectionType.NO_BACKGROUND){setTimeout((()=>{this.backgroundSelection_={type:BackgroundSelectionType.NO_SELECTION}}),100)}else{this.backgroundSelection_={type:BackgroundSelectionType.NO_SELECTION}}}let backgroundImage;switch(this.backgroundSelection_.type){case BackgroundSelectionType.NO_SELECTION:backgroundImage=this.theme_&&this.theme_.backgroundImage;break;case BackgroundSelectionType.IMAGE:backgroundImage={url:{url:this.backgroundSelection_.image.imageUrl.url}};break}if(backgroundImage){this.backgroundManager_.setBackgroundImage(backgroundImage)}}computeDoodleAllowed_(){return loadTimeData.getBoolean("themeModeDoodlesEnabled")||!this.showBackgroundImage_&&this.theme_&&this.theme_.isDefault&&!this.theme_.isDark}computeBackgroundColor_(){if(this.showBackgroundImage_){return null}return this.theme_&&this.theme_.backgroundColor}computeLogoColor_(){switch(this.backgroundSelection_.type){case BackgroundSelectionType.IMAGE:return hexColorToSkColor("#ffffff");case BackgroundSelectionType.NO_SELECTION:case BackgroundSelectionType.NO_BACKGROUND:case BackgroundSelectionType.DAILY_REFRESH:default:return this.theme_&&(this.theme_.logoColor||(this.theme_.isDark?hexColorToSkColor("#ffffff"):null))}}computeSingleColoredLogo_(){switch(this.backgroundSelection_.type){case BackgroundSelectionType.IMAGE:return true;case BackgroundSelectionType.DAILY_REFRESH:case BackgroundSelectionType.NO_BACKGROUND:case BackgroundSelectionType.NO_SELECTION:default:return this.theme_&&(!!this.theme_.logoColor||this.theme_.isDark)}}canShowPromoWithBrowserCommand_(messageData,commandSource,commandOrigin){const commandId=Object.values(promoBrowserCommand.mojom.Command).includes(messageData.commandId)?messageData.commandId:promoBrowserCommand.mojom.Command.kUnknownCommand;PromoBrowserCommandProxy.getInstance().handler.canShowPromoWithCommand(commandId).then((({canShow:canShow})=>{const response={messageType:messageData.messageType};response[messageData.commandId]=canShow;commandSource.postMessage(response,commandOrigin)}))}executePromoBrowserCommand_(commandData,commandSource,commandOrigin){const commandId=Object.values(promoBrowserCommand.mojom.Command).includes(commandData.commandId)?commandData.commandId:promoBrowserCommand.mojom.Command.kUnknownCommand;PromoBrowserCommandProxy.getInstance().handler.executeCommand(commandId,commandData.clickInfo).then((({commandExecuted:commandExecuted})=>{commandSource.postMessage(commandExecuted,commandOrigin)}))}handleOneGoogleBarMessage_(event){const data=event.data;if(data.messageType==="loaded"){if(!this.oneGoogleBarModalOverlaysEnabled_){const oneGoogleBar=$$(this,"#oneGoogleBar");oneGoogleBar.style.clipPath="url(#oneGoogleBarClipPath)";oneGoogleBar.style.zIndex="1000"}this.oneGoogleBarLoaded_=true;this.pageHandler_.onOneGoogleBarRendered(BrowserProxy.getInstance().now())}else if(data.messageType==="overlaysUpdated"){this.$.oneGoogleBarClipPath.querySelectorAll("rect").forEach((el=>{el.remove()}));const overlayRects=data.data;overlayRects.forEach((({x:x,y:y,width:width,height:height})=>{const rectElement=document.createElementNS("http://www.w3.org/2000/svg","rect");rectElement.setAttribute("x",x-8);rectElement.setAttribute("y",y-8);rectElement.setAttribute("width",width+16);rectElement.setAttribute("height",height+16);this.$.oneGoogleBarClipPath.appendChild(rectElement)}))}else if(data.messageType==="activate"){this.$.oneGoogleBarOverlayBackdrop.toggleAttribute("show",true);$$(this,"#oneGoogleBar").style.zIndex="1000"}else if(data.messageType==="deactivate"){this.$.oneGoogleBarOverlayBackdrop.toggleAttribute("show",false);$$(this,"#oneGoogleBar").style.zIndex="0"}else if(data.messageType==="can-show-promo-with-browser-command"){this.canShowPromoWithBrowserCommand_(data,event.source,event.origin)}else if(data.messageType==="execute-browser-command"){this.executePromoBrowserCommand_(data.data,event.source,event.origin)}}oneGoogleBarLoadedChange_(){if(this.oneGoogleBarLoaded_&&this.iframeOneGoogleBarEnabled_&&this.oneGoogleBarModalOverlaysEnabled_){this.setupShortcutDragDropOneGoogleBarWorkaround_()}}onMiddleSlotPromoLoaded_(){this.middleSlotPromoLoaded_=true;if(this.modulesEnabled_){return}const onResize=()=>{const promoElement=$$(this,"ntp-middle-slot-promo");promoElement.hidden=$$(this,"#mostVisited").getBoundingClientRect().bottom>=promoElement.offsetTop};this.eventTracker_.add(window,"resize",onResize);onResize()}onModulesLoaded_(){this.modulesLoaded_=true}onDismissModule_(e){this.dismissedModuleWrapper_=e.target;this.dismissModuleToastMessage_=e.detail;$$(this,"#dismissModuleToast").show();this.pageHandler_.onDismissModule(this.dismissedModuleWrapper_.descriptor.id)}onUndoDismissModuleButtonClick_(){this.dismissedModuleWrapper_.restore();$$(this,"#dismissModuleToast").hide();this.pageHandler_.onRestoreModule(this.dismissedModuleWrapper_.descriptor.id);this.dismissedModuleWrapper_=null}setupShortcutDragDropOneGoogleBarWorkaround_(){const iframe=$$(this,"#oneGoogleBar");let resetAtDragEnd=false;let dragging=false;let originalPointerEvents;this.eventTracker_.add(this.$.mostVisited,"pointerenter",(()=>{if(dragging){resetAtDragEnd=false;return}originalPointerEvents=getComputedStyle(iframe).pointerEvents;iframe.style.pointerEvents="none"}));this.eventTracker_.add(this.$.mostVisited,"pointerleave",(()=>{if(dragging){resetAtDragEnd=true;return}iframe.style.pointerEvents=originalPointerEvents}));this.eventTracker_.add(this.$.mostVisited,"dragstart",(()=>{dragging=true}));this.eventTracker_.add(this.$.mostVisited,"dragend",(()=>{dragging=false;if(resetAtDragEnd){resetAtDragEnd=false;iframe.style.pointerEvents=originalPointerEvents}}))}printPerformanceDatum_(name,time,auxTime=0){if(!this.shouldPrintPerformance_){return}if(!auxTime){console.log(`${name}: ${time}`)}else{console.log(`${name}: ${time} (${auxTime})`)}}printPerformance_(){if(!this.shouldPrintPerformance_){return}const entryTypes=["paint","measure"];const log=entry=>{this.printPerformanceDatum_(entry.name,entry.duration?entry.duration:entry.startTime,entry.duration&&entry.startTime?entry.startTime:0)};const observer=new PerformanceObserver((list=>{list.getEntries().forEach((entry=>{log(entry)}))}));observer.observe({entryTypes:entryTypes});performance.getEntries().forEach((entry=>{if(!entryTypes.includes(entry.entryType)){return}log(entry)}))}}customElements.define(AppElement.is,AppElement);export{BackgroundManager,ModuleDescriptor,ModuleRegistry,TaskModuleHandlerProxy,kaleidoscopeDescriptor,recipeTasksDescriptor,shoppingTasksDescriptor};
