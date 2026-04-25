import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MAP_PRESETS, MapThemePreset } from "../data/presets";

interface ThemePresetSelectorProps {
  applyPreset: (preset: MapThemePreset) => void;
  isReady: boolean;
}

export function ThemePresetSelector({ applyPreset, isReady }: ThemePresetSelectorProps) {
  const renderPresetItem = (preset: MapThemePreset) => (
    <SelectItem key={preset.id} value={preset.id}>
      <div className="flex items-center justify-between w-[220px]">
        <span>{preset.name}</span>
        {preset.colors && (
          <div className="flex items-center -space-x-1">
            <div
              className="w-3.5 h-3.5 rounded-full border border-border shadow-sm z-[4]"
              style={{ backgroundColor: preset.colors.background }}
              title="Background"
            />
            <div
              className="w-3.5 h-3.5 rounded-full border border-border shadow-sm z-[3]"
              style={{ backgroundColor: preset.colors.water }}
              title="Water"
            />
            <div
              className="w-3.5 h-3.5 rounded-full border border-border shadow-sm z-[2]"
              style={{ backgroundColor: preset.colors.roads }}
              title="Roads"
            />
            <div
              className="w-3.5 h-3.5 rounded-full border border-border shadow-sm z-[1]"
              style={{ backgroundColor: preset.colors.highways }}
              title="Highways"
            />
          </div>
        )}
      </div>
    </SelectItem>
  );

  return (
    <div className="space-y-2">
      <h2 className="text-sm font-semibold">Theme Preset</h2>
      <Select
        defaultValue="default"
        onValueChange={(val) => {
          const preset = MAP_PRESETS.find((p) => p.id === val);
          if (preset) applyPreset(preset);
        }}
      >
        <SelectTrigger disabled={!isReady}>
          <SelectValue placeholder="Apply a theme preset..." />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>System</SelectLabel>
            {MAP_PRESETS.filter((p) => p.theme === "system").map(renderPresetItem)}
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Light</SelectLabel>
            {MAP_PRESETS.filter((p) => p.theme === "light").map(renderPresetItem)}
          </SelectGroup>
          <SelectGroup>
            <SelectLabel>Dark</SelectLabel>
            {MAP_PRESETS.filter((p) => p.theme === "dark").map(renderPresetItem)}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
