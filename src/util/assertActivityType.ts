import {ActivityType} from '../interface/SettingsInterface';

export function assertActivityType(value: string): ActivityType {
    if (!Object.values(ActivityType).includes(value as ActivityType)) {
        throw new Error(`Invalid activity type: ${value}`);
    }
    return value as ActivityType;
}

