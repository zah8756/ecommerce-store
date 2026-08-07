"use client";

import React, { useEffect, useState, useRef } from "react";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	type CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";

const images = [
	{
		src: "/hero1.jpg",
		alt: "Hero 1",
		priority: true,
		h1text: "Vanta",
		ptext: "Modern furniture, timeless design.",
		link: "/products",
		linkText: "Explore the Collection →",
	},
	{
		src: "/hero2.jpg",
		alt: "Hero 2",
		priority: false,
		h1text: "Timeless Style",
		ptext: "Classic furniture, elegant design.",
		link: "/products",
		linkText: "Shop Now →",
	},
	{
		src: "/hero3.jpg",
		alt: "Hero 3",
		priority: false,
		h1text: "Transform Your Space",
		ptext: "Bring your vision to life with our custom solutions.",
		link: "/products",
		linkText: "Get Started →",
	},
	{
		src: "/hero4v2.jpg",
		alt: "Hero 4",
		priority: false,
		h1text: "Your Vision, Our Expertise",
		ptext: "Custom design, tailored to your needs.",
		link: "/products",
		linkText: "Discover Our Services →",
	},
];

const HeroCarousel = () => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [api, setApi] = useState<CarouselApi>();

	useEffect(() => {
		if (!api) return;
		api.on("select", () => {
			setCurrentIndex(api.selectedScrollSnap());
		});
	}, [api]);

	return (
		<div className='relative w-full h-[calc(100vh-4rem)]'>
			<Carousel
				setApi={setApi}
				className='w-full  overflow-hidden h-[calc(100vh-4rem)]'>
				<CarouselContent className='w-full h-[calc(100vh-4rem)] m-0'>
					{images.map((image) => (
						<CarouselItem
							key={image.src}
							className='relative w-full h-[calc(100vh-4rem)] p-0 basis-full'>
							<Image
								src={image.src}
								alt={image.alt}
								fill
								sizes='100vw'
								{...(image.priority && { fetchPriority: "high" })}
								className='object-cover'
							/>
							{/* Soft veil so hero text stays readable over the photo */}
							<div
								aria-hidden='true'
								className='absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-black/10'
							/>
							<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-white text-center '>
								<h1 className='font-bodoni text-9xl font- tracking-tight mb-8'>
									{image.h1text}
								</h1>
								<p className='text-3xl mb-8'>{image.ptext}</p>
								<Link
									href={image.link}
									className='text-2xl font-medium cursor-pointer underline hover:text-gray-300'>
									{image.linkText}
								</Link>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
			</Carousel>
			{/* Dot navigation */}
			<div className='absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-5 z-10'>
				{images.map((_, index) => (
					<button
						key={index}
						onClick={() => api?.scrollTo(index)}
						className={`w-4 h-4 rounded-full transition-all duration-300 cursor-pointer ${
							currentIndex === index
								? "bg-white w-8 " // active: wider pill
								: "bg-white/50" // inactive: dim circle
						}`}
						aria-label={`Go to slide ${index + 1}`}
					/>
				))}
			</div>
		</div>
	);
};

export default HeroCarousel;
