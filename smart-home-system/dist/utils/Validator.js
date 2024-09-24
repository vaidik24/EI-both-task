export class Validator {
    static isValidTime(time) {
        const timeRegex = /^([0-1]\d|2[0-3]):([0-5]\d)$/;
        return timeRegex.test(time);
    }
    static isValidCommand(command) {
        // Basic validation, can be extended
        return typeof command === "string" && command.trim().length > 0;
    }
}
