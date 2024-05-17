"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterResponseDto = exports.ErrorType = exports.RegisterRequestDto = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let RegisterRequestDto = class RegisterRequestDto {
};
exports.RegisterRequestDto = RegisterRequestDto;
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)({ message: 'Username must be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Username is required' }),
    __metadata("design:type", String)
], RegisterRequestDto.prototype, "UserName", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)({ message: 'Password must be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Password is required' }),
    __metadata("design:type", String)
], RegisterRequestDto.prototype, "Password", void 0);
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)({ message: 'Email must be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Email is required' }),
    __metadata("design:type", String)
], RegisterRequestDto.prototype, "Email", void 0);
exports.RegisterRequestDto = RegisterRequestDto = __decorate([
    (0, graphql_1.InputType)()
], RegisterRequestDto);
let ErrorType = class ErrorType {
};
exports.ErrorType = ErrorType;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], ErrorType.prototype, "message", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], ErrorType.prototype, "code", void 0);
exports.ErrorType = ErrorType = __decorate([
    (0, graphql_1.ObjectType)()
], ErrorType);
let RegisterResponseDto = class RegisterResponseDto {
};
exports.RegisterResponseDto = RegisterResponseDto;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], RegisterResponseDto.prototype, "UserName", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], RegisterResponseDto.prototype, "Email", void 0);
__decorate([
    (0, graphql_1.Field)(() => ErrorType, { nullable: true }),
    __metadata("design:type", ErrorType)
], RegisterResponseDto.prototype, "error", void 0);
exports.RegisterResponseDto = RegisterResponseDto = __decorate([
    (0, graphql_1.ObjectType)()
], RegisterResponseDto);
//# sourceMappingURL=users.dto.js.map