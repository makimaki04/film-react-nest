import { JsonLogger } from './json.logger';

describe('JsonLogger', () => {
  it('logger.log() should print correct message', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const logger = new JsonLogger();
    const logText = 'Any logging text';

    logger.log(logText);
    
    expect(logSpy).toHaveBeenCalledWith(
      `{\"level\":\"log\",\"message\":\"${logText}\",\"optionalParams\":[[]]}`,
    );
  });

  it('logger.warn() should print correct message', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const logger = new JsonLogger();
    const warnText = 'Any warning text';

    logger.warn(warnText);

    expect(warnSpy).toHaveBeenCalledWith(
      `{\"level\":\"warn\",\"message\":\"${warnText}\",\"optionalParams\":[[]]}`,
    );
  });

  it('logger.error() should print correct message', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const logger = new JsonLogger();
    const errorText = 'Any error text';

    logger.error(errorText);
    
    expect(errorSpy).toHaveBeenCalledWith(
      `{\"level\":\"error\",\"message\":\"${errorText}\",\"optionalParams\":[[]]}`,
    );
  });
});