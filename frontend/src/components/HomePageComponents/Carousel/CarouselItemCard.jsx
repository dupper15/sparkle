function CarouselItemCard(CarouselItem) {
    return(
        <div>
            <img className='h-[100px] w-[200px]' src={CarouselItem.image} alt={CarouselItem.title} />
            <span>{CarouselItem.title}</span>
        </div>
    )
}
export default CarouselItemCard