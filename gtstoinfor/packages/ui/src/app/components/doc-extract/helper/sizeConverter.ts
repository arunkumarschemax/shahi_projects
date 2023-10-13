export class SizeConverter {
    public static ConvertFromMmToPx(sizeMm: number, dpi: number): number {
        if(sizeMm <= 0 || dpi <= 0) {
            return 0;
        }
        const sizeInch = sizeMm / 25.4;
        return Math.round(sizeInch * dpi);
    }
    public static ConvertFromPxToMm(sizePx: number, dpi: number): number {
        if(sizePx <= 0 || dpi <= 0) {
            return 0;
        }
        const sizeInch = sizePx / dpi;
        return Math.round(sizeInch * 25.4);
    }
}