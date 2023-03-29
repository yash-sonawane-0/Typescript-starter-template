"use strict";
import { Get, JsonController } from "routing-controllers";
import Container, { Service } from "typedi";
import { TestService } from "../services/test.service";

@Service({ transient: true })
@JsonController("/test")
export class testController {
    private _testService: TestService;
    constructor() {
        this._testService = Container.get(TestService);
    }
    @Get("/")
    async get(): Promise<any> {
        this._testService.get(1);
        return "test";
    }
}
