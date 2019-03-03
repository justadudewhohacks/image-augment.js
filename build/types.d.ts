export interface IBox {
    x0: number;
    y0: number;
    x1: number;
    y1: number;
}
export interface IAugmentationConfig {
    randomCrop?: IBox;
    rotate?: number;
    flip?: boolean;
    blur?: {
        kernelSize: number;
        stddev: number;
    };
    intensity?: {
        alpha: number;
        beta: number;
    };
    toGray?: boolean;
    resize?: number;
    toSquare?: {
        centerContent: boolean;
    };
}
