import Image from "next/image";

interface MaterialVisualProps {
  material: string;
  priority?: boolean;
}

/**
 * Renders the photograph for a given material from /public/images/materials.
 * Images were generated via Replicate FLUX 1.1 Pro with on-brand prompts
 * (dark studio lighting, amber accents, close-up macro, square format).
 */
export default function MaterialVisual({ material, priority = false }: MaterialVisualProps) {
  const slug = material.toLowerCase();
  return (
    <div className="absolute inset-0">
      <Image
        src={`/images/materials/${slug}.png`}
        alt={`${material} material sample`}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 600px"
        className="object-cover"
        priority={priority}
      />
    </div>
  );
}
