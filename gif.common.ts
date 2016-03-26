import definition = require("gif");
import dependencyObservable = require("ui/core/dependency-observable");
import proxy = require("ui/core/proxy");
import image = require("ui/image");
import platform = require("platform");
import fs = require("file-system");
import * as types from "utils/types";

var SRC = "src";
var GIF = "Gif";
var ISLOADING = "isLoading";

// on Android we explicitly set propertySettings to None because android will invalidate its layout (skip unnecessary native call).
var AffectsLayout = platform.device.os === platform.platformNames.android ? dependencyObservable.PropertyMetadataSettings.None : dependencyObservable.PropertyMetadataSettings.AffectsLayout;

function onSrcPropertyChanged(data: dependencyObservable.PropertyChangeData) {
    var gif = <Gif>data.object;
    var value = data.newValue;

    if (types.isString(value)) {
        value = value.trim();
        gif.src = value;
    }
}

export class Gif extends image.Image implements definition.Gif {

    public static srcProperty = new dependencyObservable.Property(SRC, GIF,
        new proxy.PropertyMetadata(undefined, dependencyObservable.PropertyMetadataSettings.None, onSrcPropertyChanged));

    public static isLoadingProperty = new dependencyObservable.Property(ISLOADING, GIF,
        new proxy.PropertyMetadata(false, dependencyObservable.PropertyMetadataSettings.None));

    constructor() {
        super();
    }

    public stop(): void {

    }

    public start(): void {

    }

    get src(): any {
        return this._getValue(Gif.srcProperty);
    }
    set src(value: any) {
        this._setValue(Gif.srcProperty, value);
    }

    get isLoading(): boolean {
        return this._getValue(Gif.isLoadingProperty);
    }

}
