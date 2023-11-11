import { client } from "@/sanity/lib/client"
import { groq } from "next-sanity"

import { SanityProduct } from "@/config/inventory"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { ProductFilters } from "@/components/product-filters"
import { ProductGrid } from "@/components/product-grid"
import { ProductSort } from "@/components/product-sort"
import { seedSanityData } from "@/lib/seed"

interface Props {
  searchParams : {
    date?: string
    price?: string
  }
}

export default async function Page({searchParams}: Props) {
  // await seedSanityData(); Remove after seeding products
  // console.log(props)

  const { date = 'desc', price } = searchParams;
  const priceOrder = price ? `| order(price ${price})` : '';
  const dateOrder = date ? `| order(_createdAt ${date})` : '';
  const order = `${priceOrder}${dateOrder}`
 const products =
 await client.fetch<SanityProduct[]>(groq`*[_type == 'product'] ${order}{
  _id,
  _createdAt,
  name,
  sku,
  images,
  currency,
  price,
  discreption,
  "slug": slug.current
 }`);
//  console.log(products)
// const products1 = ['a', 'b']
  return (
    <div>
      <div className="px-4 pt-20 text-center">
        <h1 className="text-4xl font-extrabold tracking-normal">{siteConfig.name}</h1>
        <p className="mx-auto mt-4 max-w-3xl text-base">{siteConfig.description}</p>
      </div>
      <div>
        <main className="mx-auto max-w-6xl px-6">
          <div className="flex items-center justify-between border-b border-gray-200 pb-4 pt-24 dark:border-gray-800">
            <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
              {products.length} product{(products.length === 0 || products.length === 1) ? "" : "s"}
            </h1>
            {/* Product Sort */}
       
            <ProductSort />
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>
            {/* TODO: fix grid-cols-2 */}
            <div className={cn("grid grid-cols-1 gap-x-8 gap-y-10 ", products.length > 0 ? 'lg:grid-cols-4' :'lg:grid-cols-[1fr_3fr]' )}>
                <div className="hidden lg:block">
                  {/* Product filters */}
                  <ProductFilters />
                </div>
              {/* Product grid */}
              <ProductGrid products={products} />
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
