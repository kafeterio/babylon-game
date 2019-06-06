

import {
  FiberAbstractMeshProps,
  FiberAdvancedDynamicTextureProps,
  FiberAnaglyphArcRotateCameraProps,
  FiberAnaglyphFreeCameraProps,
  FiberAnaglyphGamepadCameraProps,
  FiberAnaglyphUniversalCameraProps,
  FiberArcFollowCameraProps,
  FiberArcRotateCameraProps,
  FiberBackgroundMaterialProps,
  FiberBaseSliderProps,
  FiberBaseTextureProps,
  FiberButtonProps,
  FiberButton3DProps,
  FiberCameraProps,
  FiberCheckboxProps,
  FiberColorGradingTextureProps,
  FiberColorPickerProps,
  FiberContainerProps,
  FiberContainer3DProps,
  FiberControlProps,
  FiberControl3DProps,
  FiberCubeTextureProps,
  FiberCustomProceduralTextureProps,
  FiberCylinderPanelProps,
  FiberDeviceOrientationCameraProps,
  FiberDirectionalLightProps,
  FiberDisplayGridProps,
  FiberDynamicTextureProps,
  FiberEllipseProps,
  FiberEnvironmentHelperProps,
  FiberFlyCameraProps,
  FiberFollowCameraProps,
  FiberFreeCameraProps,
  FiberGUI3DManagerProps,
  FiberGamepadCameraProps,
  FiberGridProps,
  FiberHDRCubeTextureProps,
  FiberHemisphericLightProps,
  FiberHolographicButtonProps,
  FiberImageProps,
  FiberImageBasedSliderProps,
  FiberInputPasswordProps,
  FiberInputTextProps,
  FiberLightProps,
  FiberLineProps,
  FiberMaterialProps,
  FiberMeshProps,
  FiberMeshButton3DProps,
  FiberMirrorTextureProps,
  FiberMultiLineProps,
  FiberMultiMaterialProps,
  FiberMultiRenderTargetProps,
  FiberNodeProps,
  FiberNoiseProceduralTextureProps,
  FiberPBRBaseMaterialProps,
  FiberPBRBaseSimpleMaterialProps,
  FiberPBRMaterialProps,
  FiberPBRMetallicRoughnessMaterialProps,
  FiberPBRSpecularGlossinessMaterialProps,
  FiberPlanePanelProps,
  FiberPointLightProps,
  FiberProceduralTextureProps,
  FiberPushMaterialProps,
  FiberRadioButtonProps,
  FiberRawCubeTextureProps,
  FiberRawTextureProps,
  FiberRawTexture3DProps,
  FiberRectangleProps,
  FiberRefractionTextureProps,
  FiberRenderTargetTextureProps,
  FiberScatterPanelProps,
  FiberScrollViewerProps,
  FiberSelectionPanelProps,
  FiberShaderMaterialProps,
  FiberShadowGeneratorProps,
  FiberShadowLightProps,
  FiberSliderProps,
  FiberSpherePanelProps,
  FiberSpotLightProps,
  FiberStackPanelProps,
  FiberStackPanel3DProps,
  FiberStandardMaterialProps,
  FiberStereoscopicArcRotateCameraProps,
  FiberStereoscopicFreeCameraProps,
  FiberStereoscopicGamepadCameraProps,
  FiberStereoscopicUniversalCameraProps,
  FiberTargetCameraProps,
  FiberTextBlockProps,
  FiberTextureProps,
  FiberTouchCameraProps,
  FiberTransformNodeProps,
  FiberUniversalCameraProps,
  FiberVRDeviceOrientationArcRotateCameraProps,
  FiberVRDeviceOrientationFreeCameraProps,
  FiberVRDeviceOrientationGamepadCameraProps,
  FiberVRExperienceHelperProps,
  FiberVideoTextureProps,
  FiberVirtualJoysticksCameraProps,
  FiberVirtualKeyboardProps,
  FiberVolumeBasedPanelProps,
  FiberWebVRFreeCameraProps,
  FiberWebXRCameraProps,
  FiberBox,
  FiberGround
} from "react-babylonjs"
import React from "react"
declare module "react-babylonjs" {
  class AbstractMesh extends React.Component<FiberAbstractMeshProps, any> { }
  class AdvancedDynamicTexture extends React.Component<
    FiberAdvancedDynamicTextureProps,
    any
    > { }
  class AnaglyphArcRotateCamera extends React.Component<
    FiberAnaglyphArcRotateCameraProps,
    any
    > { }
  class AnaglyphFreeCamera extends React.Component<
    FiberAnaglyphFreeCameraProps,
    any
    > { }
  class AnaglyphGamepadCamera extends React.Component<
    FiberAnaglyphGamepadCameraProps,
    any
    > { }
  class AnaglyphUniversalCamera extends React.Component<
    FiberAnaglyphUniversalCameraProps,
    any
    > { }
  class ArcFollowCamera extends React.Component<
    FiberArcFollowCameraProps,
    any
    > { }
  class ArcRotateCamera extends React.Component<
    FiberArcRotateCameraProps,
    any
    > { }
  class BackgroundMaterial extends React.Component<
    FiberBackgroundMaterialProps,
    any
    > { }
  class BaseSlider extends React.Component<FiberBaseSliderProps, any> { }
  class BaseTexture extends React.Component<FiberBaseTextureProps, any> { }
  class Button extends React.Component<FiberButtonProps, any> { }
  class Button3D extends React.Component<FiberButton3DProps, any> { }
  class Camera extends React.Component<FiberCameraProps, any> { }
  class Checkbox extends React.Component<FiberCheckboxProps, any> { }
  class ColorGradingTexture extends React.Component<
    FiberColorGradingTextureProps,
    any
    > { }
  class ColorPicker extends React.Component<FiberColorPickerProps, any> { }
  class Container extends React.Component<FiberContainerProps, any> { }
  class Container3D extends React.Component<FiberContainer3DProps, any> { }
  class Control extends React.Component<FiberControlProps, any> { }
  class Control3D extends React.Component<FiberControl3DProps, any> { }
  class CubeTexture extends React.Component<FiberCubeTextureProps, any> { }
  class CustomProceduralTexture extends React.Component<
    FiberCustomProceduralTextureProps,
    any
    > { }
  class CylinderPanel extends React.Component<FiberCylinderPanelProps, any> { }
  class DeviceOrientationCamera extends React.Component<
    FiberDeviceOrientationCameraProps,
    any
    > { }
  class DirectionalLight extends React.Component<
    FiberDirectionalLightProps,
    any
    > { }
  class DisplayGrid extends React.Component<FiberDisplayGridProps, any> { }
  class DynamicTexture extends React.Component<FiberDynamicTextureProps, any> { }
  class Ellipse extends React.Component<FiberEllipseProps, any> { }
  class EnvironmentHelper extends React.Component<
    FiberEnvironmentHelperProps,
    any
    > { }
  class FlyCamera extends React.Component<FiberFlyCameraProps, any> { }
  class FollowCamera extends React.Component<FiberFollowCameraProps, any> { }
  class FreeCamera extends React.Component<FiberFreeCameraProps, any> { }
  class GUI3DManager extends React.Component<FiberGUI3DManagerProps, any> { }
  class GamepadCamera extends React.Component<FiberGamepadCameraProps, any> { }
  class Grid extends React.Component<FiberGridProps, any> { }
  class HDRCubeTexture extends React.Component<FiberHDRCubeTextureProps, any> { }
  class HemisphericLight extends React.Component<
    FiberHemisphericLightProps,
    any
    > { }
  class HolographicButton extends React.Component<
    FiberHolographicButtonProps,
    any
    > { }
  class Image extends React.Component<FiberImageProps, any> { }
  class ImageBasedSlider extends React.Component<
    FiberImageBasedSliderProps,
    any
    > { }
  class InputPassword extends React.Component<FiberInputPasswordProps, any> { }
  class InputText extends React.Component<FiberInputTextProps, any> { }
  class Light extends React.Component<FiberLightProps, any> { }
  class Line extends React.Component<FiberLineProps, any> { }
  class Material extends React.Component<FiberMaterialProps, any> { }
  class Mesh extends React.Component<FiberMeshProps, any> { }
  class MeshButton3D extends React.Component<FiberMeshButton3DProps, any> { }
  class MirrorTexture extends React.Component<FiberMirrorTextureProps, any> { }
  class MultiLine extends React.Component<FiberMultiLineProps, any> { }
  class MultiMaterial extends React.Component<FiberMultiMaterialProps, any> { }
  class MultiRenderTarget extends React.Component<
    FiberMultiRenderTargetProps,
    any
    > { }
  class Node extends React.Component<FiberNodeProps, any> { }
  class NoiseProceduralTexture extends React.Component<
    FiberNoiseProceduralTextureProps,
    any
    > { }
  class PBRBaseMaterial extends React.Component<
    FiberPBRBaseMaterialProps,
    any
    > { }
  class PBRBaseSimpleMaterial extends React.Component<
    FiberPBRBaseSimpleMaterialProps,
    any
    > { }
  class PBRMaterial extends React.Component<FiberPBRMaterialProps, any> { }
  class PBRMetallicRoughnessMaterial extends React.Component<
    FiberPBRMetallicRoughnessMaterialProps,
    any
    > { }
  class PBRSpecularGlossinessMaterial extends React.Component<
    FiberPBRSpecularGlossinessMaterialProps,
    any
    > { }
  class PlanePanel extends React.Component<FiberPlanePanelProps, any> { }
  class PointLight extends React.Component<FiberPointLightProps, any> { }
  class ProceduralTexture extends React.Component<
    FiberProceduralTextureProps,
    any
    > { }
  class PushMaterial extends React.Component<FiberPushMaterialProps, any> { }
  class RadioButton extends React.Component<FiberRadioButtonProps, any> { }
  class RawCubeTexture extends React.Component<FiberRawCubeTextureProps, any> { }
  class RawTexture extends React.Component<FiberRawTextureProps, any> { }
  class RawTexture3D extends React.Component<FiberRawTexture3DProps, any> { }
  class Rectangle extends React.Component<FiberRectangleProps, any> { }
  class RefractionTexture extends React.Component<
    FiberRefractionTextureProps,
    any
    > { }
  class RenderTargetTexture extends React.Component<
    FiberRenderTargetTextureProps,
    any
    > { }
  class ScatterPanel extends React.Component<FiberScatterPanelProps, any> { }
  class ScrollViewer extends React.Component<FiberScrollViewerProps, any> { }
  class SelectionPanel extends React.Component<FiberSelectionPanelProps, any> { }
  class ShaderMaterial extends React.Component<FiberShaderMaterialProps, any> { }
  class ShadowGenerator extends React.Component<
    FiberShadowGeneratorProps,
    any
    > { }
  class ShadowLight extends React.Component<FiberShadowLightProps, any> { }
  class Slider extends React.Component<FiberSliderProps, any> { }
  class SpherePanel extends React.Component<FiberSpherePanelProps, any> { }
  class SpotLight extends React.Component<FiberSpotLightProps, any> { }
  class StackPanel extends React.Component<FiberStackPanelProps, any> { }
  class StackPanel3D extends React.Component<FiberStackPanel3DProps, any> { }
  class StandardMaterial extends React.Component<
    FiberStandardMaterialProps,
    any
    > { }
  class StereoscopicArcRotateCamera extends React.Component<
    FiberStereoscopicArcRotateCameraProps,
    any
    > { }
  class StereoscopicFreeCamera extends React.Component<
    FiberStereoscopicFreeCameraProps,
    any
    > { }
  class StereoscopicGamepadCamera extends React.Component<
    FiberStereoscopicGamepadCameraProps,
    any
    > { }
  class StereoscopicUniversalCamera extends React.Component<
    FiberStereoscopicUniversalCameraProps,
    any
    > { }
  class TargetCamera extends React.Component<FiberTargetCameraProps, any> { }
  class TextBlock extends React.Component<FiberTextBlockProps, any> { }
  class Texture extends React.Component<FiberTextureProps, any> { }
  class TouchCamera extends React.Component<FiberTouchCameraProps, any> { }
  class TransformNode extends React.Component<FiberTransformNodeProps, any> { }
  class UniversalCamera extends React.Component<
    FiberUniversalCameraProps,
    any
    > { }
  class VRDeviceOrientationArcRotateCamera extends React.Component<
    FiberVRDeviceOrientationArcRotateCameraProps,
    any
    > { }
  class VRDeviceOrientationFreeCamera extends React.Component<
    FiberVRDeviceOrientationFreeCameraProps,
    any
    > { }
  class VRDeviceOrientationGamepadCamera extends React.Component<
    FiberVRDeviceOrientationGamepadCameraProps,
    any
    > { }
  class VRExperienceHelper extends React.Component<
    FiberVRExperienceHelperProps,
    any
    > { }
  class VideoTexture extends React.Component<FiberVideoTextureProps, any> { }
  class VirtualJoysticksCamera extends React.Component<
    FiberVirtualJoysticksCameraProps,
    any
    > { }
  class VirtualKeyboard extends React.Component<
    FiberVirtualKeyboardProps,
    any
    > { }
  class VolumeBasedPanel extends React.Component<
    FiberVolumeBasedPanelProps,
    any
    > { }
  class WebVRFreeCamera extends React.Component<
    FiberWebVRFreeCameraProps,
    any
    > { }
  class WebXRCamera extends React.Component<FiberWebXRCameraProps, any> { }
  class Box extends React.Component<FiberMeshProps, any> { }
  class Ground extends React.Component<FiberMeshProps, any> { }
  class Plane extends React.Component<FiberMeshProps, any> { }
}
