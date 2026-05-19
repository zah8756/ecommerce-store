import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import * as dotenv from "dotenv";
import bcrypt from "bcryptjs";

dotenv.config();

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
	await prisma.product.deleteMany();

	const hashedPassword = await bcrypt.hash("password123", 10);

	await prisma.user.create({
		data: {
		  name: "Test User",
		  email: "test@test.com",
		  password: hashedPassword,
		  role: "USER",
		},
	  })

	  console.log("✅ Test user created")

	const products = [
		{
			name: "Linen Sofa",
			description:
				"A minimalist three-seater sofa upholstered in natural linen. Perfect for modern living rooms.",
			price: 1299.99,
			image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800",
			category: "Living Room",
			stock: 12,
		},
		{
			name: "Oak Dining Table",
			description:
				"Solid oak dining table with clean lines and a natural finish. Seats six comfortably.",
			price: 899.99,
			image:
				"https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800",
			category: "Dining",
			stock: 8,
		},
		{
			name: "Walnut Bed Frame",
			description:
				"Platform bed frame in rich walnut with a low-profile design and slatted base.",
			price: 749.99,
			image:
				"https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800",
			category: "Bedroom",
			stock: 6,
		},
		{
			name: "Accent Armchair",
			description:
				"Sculptural armchair with bouclé upholstery and solid wood legs. A statement piece for any room.",
			price: 549.99,
			image:
				"https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800",
			category: "Living Room",
			stock: 15,
		},
		{
			name: "Marble Coffee Table",
			description:
				"Round coffee table with a genuine marble top and brushed brass base.",
			price: 649.99,
			image:
				"https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=800",
			category: "Living Room",
			stock: 5,
		},
		{
			name: "Rattan Nightstand",
			description:
				"Bedside table with rattan drawer front and solid mango wood frame.",
			price: 249.99,
			image:
				"https://images.unsplash.com/photo-1591129841117-3adfd313e34f?w=800",
			category: "Bedroom",
			stock: 20,
		},
		{
			name: "Upholstered Dining Chair",
			description:
				"Set of two dining chairs with velvet upholstery and tapered oak legs.",
			price: 399.99,
			image:
				"https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800",
			category: "Dining",
			stock: 18,
		},
		{
			name: "Floating Shelf Unit",
			description:
				"Wall-mounted shelf unit in smoked oak with three adjustable shelves.",
			price: 329.99,
			image:
				"https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?w=800",
			category: "Storage",
			stock: 10,
		},
	];

	for (const product of products) {
		await prisma.product.create({ data: product });
	}

	console.log("✅ Database seeded with", products.length, "products");
}

main()
	.catch(console.error)
	.finally(() => prisma.$disconnect());
