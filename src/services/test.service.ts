import { Service } from "typedi";

@Service({ transient: true })
export class TestService {
    async get(id: number) {
        return "test";
    }
}
