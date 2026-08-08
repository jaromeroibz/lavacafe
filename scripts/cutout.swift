// Subject lifting via Vision — the same model behind "Remove Background" in
// Photos. Needs no downloads and no Python.
//
//   swift scripts/cutout.swift <input.png> <output.png>

import Foundation
import Vision
import CoreImage

let args = CommandLine.arguments
guard args.count >= 3 else {
    FileHandle.standardError.write("uso: cutout.swift <entrada> <salida>\n".data(using: .utf8)!)
    exit(64)
}

let inURL = URL(fileURLWithPath: args[1])
let outURL = URL(fileURLWithPath: args[2])

guard let image = CIImage(contentsOf: inURL) else {
    FileHandle.standardError.write("no pude leer \(inURL.path)\n".data(using: .utf8)!)
    exit(65)
}

let handler = VNImageRequestHandler(ciImage: image, options: [:])
let request = VNGenerateForegroundInstanceMaskRequest()

do {
    try handler.perform([request])
} catch {
    FileHandle.standardError.write("Vision falló: \(error)\n".data(using: .utf8)!)
    exit(70)
}

guard let result = request.results?.first else {
    FileHandle.standardError.write("Vision no encontró ningún sujeto\n".data(using: .utf8)!)
    exit(71)
}

FileHandle.standardError.write("instancias detectadas: \(result.allInstances.count)\n".data(using: .utf8)!)

do {
    let masked = try result.generateMaskedImage(
        ofInstances: result.allInstances,
        from: handler,
        croppedToInstancesExtent: true
    )
    let out = CIImage(cvPixelBuffer: masked)
    let ctx = CIContext()
    try ctx.writePNGRepresentation(
        of: out,
        to: outURL,
        format: .RGBA8,
        colorSpace: CGColorSpace(name: CGColorSpace.sRGB)!
    )
    FileHandle.standardError.write("escrito \(outURL.path)\n".data(using: .utf8)!)
} catch {
    FileHandle.standardError.write("no pude generar el recorte: \(error)\n".data(using: .utf8)!)
    exit(72)
}
