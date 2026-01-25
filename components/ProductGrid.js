function ProductGrid() {
    const [featuredProducts, setFeaturedProducts] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchFeaturedProducts = async () => {
            try {
                // Fetch only the first 9 products for the homepage
                const allProducts = await window.db.getCollection('products');
                const featured = allProducts.slice(0, 9); // Limit to 9 products
                console.log(`[ProductGrid] Loaded ${featured.length} featured products`);
                setFeaturedProducts(featured);
            } catch (error) {
                console.error('[ProductGrid] Error fetching products:', error);
                setFeaturedProducts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchFeaturedProducts();
    }, []);

    return (
        <section id="products" className="py-16 px-4 bg-white/50">
            <div className="container mx-auto">
                <div className="text-center mb-12">
                    <div className="inline-block bg-[var(--primary)] text-white py-3 px-10 rounded-tl-3xl rounded-br-3xl shadow-lg transform -skew-x-12">
                        <h2 className="text-2xl md:text-3xl font-bold transform skew-x-12">المنتجات الأكثر مبيعاً</h2>
                    </div>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="w-12 h-12 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                            {featuredProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>

                        <div className="mt-12 text-center">
                            <ReactRouterDOM.Link to="/products" className="inline-block bg-white text-[var(--primary)] border-2 border-[var(--primary)] px-8 py-3 rounded-full font-bold hover:bg-[var(--primary)] hover:text-white transition-colors duration-300 shadow-md">
                                تصفح جميع المنتجات
                            </ReactRouterDOM.Link>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
}