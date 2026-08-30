// Metro/NativeWind resolvem CSS em build time; a importação só existe pelo efeito colateral.
declare module '*.css';

/**
 * Descritor de arquivo local aceito pelo `FormData` do React Native no lugar de
 * um `Blob` — é assim que se sobe o `file://` devolvido pela câmera. O `lib:
 * ["DOM"]` do tsconfig do Expo não conhece essa sobrecarga, então ela é
 * declarada aqui em vez de resolvida com `as`.
 */
interface IReactNativeFile {
  uri: string;
  name: string;
  type: string;
}

interface FormData {
  append(name: string, value: IReactNativeFile): void;
}
