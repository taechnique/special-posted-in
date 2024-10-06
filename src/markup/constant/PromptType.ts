export default class PromptType {

    private static readonly NOTE = new PromptType('note');
    private static readonly TIP = new PromptType('tip');

    private readonly _name: string;

    private constructor(name: string) {
        this._name = name;
    }

    get name(): string {
        return this._name;
    }

    private static values (): Array<PromptType> {
        return [this.NOTE, this.TIP];
    }

    public static includes(name: string) {
        return this.values().some(icon => icon._name === name);
    }

}
