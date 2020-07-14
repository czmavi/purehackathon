import { Device } from "./device";
import { User } from "./user";

export interface ConnectedEntity {
    device?: Device
    user?: User
}
