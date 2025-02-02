import { Logger } from "@nestjs/common";
import { LoggerConfig } from "src/app.config.provider";
import { JsonLogger } from "./json.logger";
import { TskvLogger } from "./tskv.logger";

export function useLogger(logger: LoggerConfig) {
    switch (logger) {
      case LoggerConfig.dev:
        return new Logger();
      case LoggerConfig.json:
        return new JsonLogger();
      case LoggerConfig.tskv:
        return new TskvLogger();
    }
    
    return undefined;
  }