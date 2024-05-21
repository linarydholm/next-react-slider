import Image from 'next/image';

type ProductCard = {
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  product: {
    title: string;
    price: number;
  };
};

export function ProductCard({ image, product }: ProductCard) {
  return (
    <section className="w-80 group">
      <div className="relative">
        <Image
          className="object-cover aspect-square"
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
        />
        <button className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-black bg-opacity-80 hover:bg-opacity-100 text-white py-4 px-6 uppercase text-sm tracking-wider opacity-0 transition group-hover:opacity-100">
          Add to cart
        </button>
      </div>

      <div className="p-2">
        <p className="font-semibold text-md">{product.title}</p>
        <p className="text-sm">{product.price} kr</p>
      </div>
    </section>
  );
}
