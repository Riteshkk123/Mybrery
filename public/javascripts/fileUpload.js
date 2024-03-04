FilePond.registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginImageResize,
    FilePondPluginFileEncode,

)
// this proerty is for seting the size of iamges 
FilePond.setOptions({stylePanelAspectRatio: 150/100,
imageResizeTargetWidth:100,
imageResizeTargetHeight:150 })
FilePond.parse(document.body);