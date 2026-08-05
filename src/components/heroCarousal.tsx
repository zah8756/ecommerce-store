"use client";

import React, { useEffect, useState, useRef } from "react";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	type CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";

const images = [
	{
		src: "/hero1.jpg",
		alt: "Hero 1",
		priority: true,
	},
	{
		src: "/hero2.jpg",
		alt: "Hero 2",
		priority: false,
	},
	{
		src: "/hero3.jpg",
		alt: "Hero 3",
		priority: false,
	},
	{
		src: "/hero4v2.jpg",
		alt: "Hero 4",
		priority: false,
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
						className={`w-6 h-6 rounded-full transition-all duration-300 cursor-pointer ${
							currentIndex === index
								? "bg-white w-12" // active: wider pill
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
