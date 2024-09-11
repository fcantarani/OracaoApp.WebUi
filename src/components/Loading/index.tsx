import { FaHandsPraying } from "react-icons/fa6";

export default function LoadingComponent() {
  return (
    <div className="flex h-full w-full animate-pulse flex-col items-center justify-center">
      <FaHandsPraying size={48} className="text-[#4090BF]" />
      <span className="font-semibold">Por favor, aguarde.</span>
      <span className="text-[0.875rem]">
        Estamos processando a sua solicitação.
      </span>
    </div>
  );
}
