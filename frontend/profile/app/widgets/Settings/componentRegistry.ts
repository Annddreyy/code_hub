import type { Component } from 'vue';
import AvatarUpload from './AvatarUpload.vue';
import DangerBtn from './DangerBtn.vue';
import Input from './Input.vue';
import SaveBtn from './SaveBtn.vue';
import Select from './Select.vue';
import Toggle from './Toggle.vue';

export const componentRegistry: Record<string, Component> = {
    AvatarUpload,
    DangerBtn,
    Input,
    SaveBtn,
    Select,
    Toggle,
};
