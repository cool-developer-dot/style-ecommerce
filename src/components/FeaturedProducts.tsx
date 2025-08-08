'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, ShoppingCart } from 'lucide-react';
import { useCart } from './CartContext';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  isNew?: boolean;
  isSale?: boolean;
  isHot?: boolean;
}

const FeaturedProducts = () => {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);
  const [addedToCart, setAddedToCart] = useState<number[]>([]);
  const { addToCart } = useCart();

  const products: Product[] = [
    {
      id: 1,
      name: "Premium Cotton T-Shirt",
      price: 29.99,
      originalPrice: 39.99,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop",
      rating: 4.8,
      reviews: 124,
      category: "Men",
      isSale: true
    },
    {
      id: 2,
      name: "Elegant Summer Dress",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=500&fit=crop",
      rating: 4.9,
      reviews: 89,
      category: "Women",
      isNew: true
    },
    {
      id: 3,
      name: "Classic Denim Jacket",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400&h=500&fit=crop",
      rating: 4.7,
      reviews: 156,
      category: "Men"
    },
    {
      id: 4,
      name: "Stylish Sneakers",
      price: 79.99,
      originalPrice: 99.99,
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop",
      rating: 4.6,
      reviews: 203,
      category: "Footwear",
      isSale: true
    },
    {
      id: 5,
      name: "Casual Blouse",
      price: 49.99,
      image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTExMVFRUXGBgXGBgYGBgaGhcaGhgXHhcdGBcYHSggGBolHR4XITEiJSkrLi4uGCAzODMtNygtLisBCgoKDg0OGxAQGy0lHyYtLS0tLS0rLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAEAAIDBQYBBwj/xABHEAABAgMEBQkECAUDAwUAAAABAAIDESEEEjFBBVFhcZEGEyKBobHB0fAyQlKSBxRTYnKT0uEVI4Ki8TNDVIOywhYkRGPi/8QAGQEAAwEBAQAAAAAAAAAAAAAAAAECAwQF/8QAKBEAAgIBBAEEAgIDAAAAAAAAAAECESEDEjFBUQQTMmEigXHwFKGx/9oADAMBAAIRAxEAPwDJNgjWfmPmpWQB975nea4IZUrD6mpAaYLNR4nzUToLdXafNHCEf8yXLhHw9Zb5pWMrjZ2/CEPbrM0MJAlUVFDxVm6XxMH9bPEoe1BhaWmJCqPtGeBUt4LismfZaXsJBF9oJmR7XWE1uk2A4kdR1ruD3bvBD2h3SPWs6TOi2iy0fpkBxDSTNrm4H4fMBD/WosSUhdEmiZxzIkERyfgudGZJhcA4X5YXZ9KZ3FWMXk7aGCgDwCPZMyQBKd2XXRQ3FFLc+Sz5H6PZz11wDpwwX3uledN0yZ0NVt26NgjCHD+RnksdyV0hDg2i/FcGt5oiZ13sJSNcVsP/AFVYvtW/Kf0rq9PJbMnJ6hPfSJRYYfwM+VvknCyM+BvU0eSgPKqx/bcGv/SmnlHZD/un5X/pXRuRz/kEfVG/AOA8kx0ADIcAhjygsn2rvkf+lMOn7L9q78uJ+lO0DsmfCGodiFitXX8oLN9ofyog/wDFAR9O2f4nflxP0pWgpj3w00MQj9OQdb/y4n6Uxum4Ot/5cT9KVodMtYQkiWlU7dOQf/s/LifpTxpuDri/lxP0qlJEtMt2YqZslUN05AzET8qL5KVvKCz6nflRP0qrXkmmWYcNi6XDYq7/ANQWf7/5UT9KQ09Z8i78qJ+lG5eQpllPcul2711qsdp2B8Tx/wBOJ+lNbp+z/E8/9OL+lG5BTLW8F1Vf8fs+uJ+XF/Ski0FMwf1SHm3iSe8qQWSF8DeATpJ4bguM6hosML7NnyjyS+pQ/gbwCl6wo4kQa+1FDshdZoeTW6sAuCCzUOAXXOGbhPeEucaMxxCfAittrJOva5jtVe2EXPa0e05waN5dIdpR1qjh14A+9MdcloOS+gojD9Ziw3C60uhtlNziR7V0VEhhPMjUuf4o6/kaOw2KHAhhjZBrRUnN3vEnaUNaOUdnh0MQOOpvS7qdqw+mPrMV7nRIcWUzJpY+63VISlhmm6P0NaIjwGQYhqMWkDAe86QAWUdDuTKcneDfaJtEGNGLmhzXloBBGILqEynKufFaz+BvlNjmu2B0jto5VfJ3RLLM1z3G9FiNa1xyaBPot3kmZ3ddk2MZgiktS30pOCojU0lJ2I6LjjFjuE+5RvY4TmCN4KNFreMHFNdpOKKh54+S3976MH6e+wEvOvvTHz1qwGlGPpGYCPjbRw68+tDacMKzFpdEFx46LiDUjEdEGuHFaw1IyMZ6UolfFB1oKK3apImm7OcIo6mv/Sg4ulYPx/2v8k20Qkxr27V1g2lDO0jC+M/K/wDSus0jC+L+1/kpTRdMtIW89qJYR97gfNVUPSsH4h8rvJFM0jCxvf2v8lVryTQeXag9Na533uCh+uQtf9r/ACSbpGD8Y4HyT3Imgy87anQycwe3zQZ0lA+Nvb5Ln8Tg/G3t8k7Ciwe0Sz4EqvhxXB3SLiOzsTm6Qg/aNHcl/EoP2reKLCgjnfUz5LqH/icH7VvFJG5C2mB5mH8LflCkEOH8LPkHkuNlqKnZPUuM6iMwYfwN+QeSjeyGPcb8g8kaL+Uu1DxYLts/WxVSJtggezJo+UDwSvlxutaSTgAJk7gMUXYtFxIz7rRtJNA0az6qthovRkOzjoCbzQxDidw90KXSLhGUir5PcnBBPOxw10XFjTIiHt1F+O5X0R5Jmurslm8nXFbSO9vUjCUhDUogkbkqLs5LMlEwRRDOajLKE0Q2SObghowxGohGFtELbM+opsSK2NPD1kjYEUxWBhzY4j8TTOnVTrUEVl4EZ5JlgtQaYZlItee0V7QFKlTNNu5NAzuvihojj6KtdMPhw4jmmIxs5OaCQDddUYnq6lURLdB+2hn+pvmu38Ty/yToiDjPFW0GwXQC8Tca3cJb9Z2ZIXQ0SE+MA1zHXQXkAg4YYfeLVa6UtHNw3RXZSAGbnOMmjistSXUS4LtklhgxHmTBIZyoBvkr90IQoUm1ecXHHq1BRWR4YwNGOe05op3SasEi2yhfaYs6vd1klROtTveDXb2g9uKsoljJKFtFiI/ZTUlwVaIBCY/2eg7UT0TuJqOuaGdDcDItIIyqiWw5I50LnIZ+JgmDPFoxB6qro0tV3UjHU0+0UrgdRTVwW2Cf96H+Y3zTvrkD7WF+Y3zXTuRjTHT2JLn12B9rC/MHmklaCmeYmyA5u+c+ac2xDW753eacUprnNx4so+987vNFaO0KY7wxoOskudJozJqgr21aTkXbLr4jRi5okdxM+9D4HFW6NJZbAyDD5qGOiMXGpe7Mk+pJpdJFNqCENFFd6xZ2pUh0N8ypXMzQc6ouzxPBAx7HYoiGcpJu0BJpACYqE5qnsbdi5Dhl0hhPtT7HDOG+m0GvrYgVBEJsxjmhrfApMTRsFsiRs7fXcu2hsxv9eaGhJ5KEOLRKXjhsCgiWYgF/fsr3d6LjNIdQUHoo0WUFt0EGkx5Haoo23UVmktFQ7VDa50NsR8MEMmASWYuFdXtDrWUi6Ns/wBjD+ULZ6NiFsMke0x0txaTLjJVXKeyhrhGZRkWuwO94d546l06M+mcfqdPO5HeRmjYLedexjGmjDIAGWOWU+5QfSPEcLJNvuRGO7adslV8ldN81bTAeZNjtugnAPbMs4iY3kLQcri36raOcBu3HTljhSU85pT+RjBYBNDcoWx4bYjTjRwza7MEb8FsNB20PF0muIXztorSb7PED2nY5uThn1r1PR1uIAewkA1CxktkjWP5I9BtT3NwohXWsmhFVDo7T8OKA2J0XYTyPkrB1jkZgzHrNUnfBDwBQ7PVHWaEG1KeyGAqHlHpoMcIDTN7hN0j7LZymdRJmBuOpOg5MvadFWMPcPqsL2j7g1p38Asp/wDiwvkCNtDRea6U5tHZNvgnAga11xaaOdp2A/wKy/8AGhfIEkdPeup4EeYkRfuf3eScGxPudqkmnA+prmOgi5qL8TOBVlybe9loaXFsiCKTnMimO0Digiuw33XB3wkHLIpNDi6dnplkNJ/ePemRva7E/RnskY0/7cOyS5zEhOWozxy1ZLA9CiGK1PYNSnDJqMUO715IALgylXYpzDA6vD9ihYYoRvHkjIb5gHWK7x+01SIYHBikCWbHEcPNsuCPvyeH+7EqNkRuPEKttLLsT8Q7W07pFGWJnOMdD19JmxzfMTCBvgtaUI9eqhccKHj661FY3XmUzE9xz7e9Ttq3q7D5eCozKl7OlvRBa5g6MpY7ZZ1UET2vVCrtjA5tZ7UJWU2UdjkYsRpn0xM7cid8wDPWUO6zc9CiWdzrpmbrhix2TgDjLVmJqz0pDawMjVm1waSBS64ip2TuqLSEDp324ymZZjWllDdSR43yi0BHhOIfEvPYfhu7QWuHELX8leULLdBMCNIxw2TgZfzR8Q1nWPNXnKLR3PwucaCYkMSIzczxLa9S8t0roshwiQphwN4SxBBmCNRmtmlKNnFJOEqJ+VHJfmCXwwSzMYlu7WEBojlPEgC7IRG5Ak03FX+juW94c3bW1FOdaK/1sGe1vBVGmdAB5MWyFsVhqQwgkdWPURNZ/Ug+0azQelodpbNlHD2mnEeY2rQ6P0rGg0a6Y1Go7cF4/BsFqguD2se12RbKfXLuK1WitI6Si0LIbW/aPbKXUHAHgolCncWWpXyj0i28sLkIu5vpandaKl7jgGjtJwAmVntGaLe5z40Z4MR5vRHT6LfhY0/C0UGtUcTT1lsxJL3WqPKVPZGy9KQGwIbR+kLRa4ofEIDWmbWNo1vUcTtKuCb5Im0jS6RvviEsjFrAAGtuMNAMZmtTM9aG5mN/yD+XDRbIRnKU50UtosD4ci5krwmMD3YHYuuoo5/yeQHmYv25/LhriL5rYkngMmAbEYTR7fmG3an3m/HD+dlN9aLjmN1N4BIMGQHALls3EYjPtIfzt81x0Zkv9RnztPipGsGocAuRQMgJbgiwPQNDWmVyZo9jZHIktHEHwWis7A5vEeSxNlm6ywsnBnRP4T0D2BaPk/bi8VoRQjVu2LHuj0OYphogSKZa4FJhWEVwnOW312J/NTB4j1uTomynhOqNvgpoLpTGozCjjw7ru0eK6/HeO79kiiXSMK9DmMWGY6su5RaMjScCDjUb8vW1G2dwI2GQPCSqWNuOLdRpuQ8ZFHODSMaA8kUDumO548eCkAlPj5+tqiskS82Y9pvSG0e8O88FNnIYHDvHZTqVozZTaQMjNW2hrTfbImop5IK2wp943evBV9htBhu2jtCV07LrdGjSFzQS1woeiQcwdiCdZ3MaA6haSGnIit3eJURVrgiK0RG0IxzpuT4T77bplMZlUQnRSTMN4ImNX6XeBVFys0GxzHWiG0gAXojGgmWtzQBhjOW061sI8K80iVcDPPfrHqirobnMdjTiWnUdfjsKFLawlFTR4lb2QHVDuw+SqubuumyJI6wXNPEL2LlRyfoY0Jou4vaPd2t1t1jJYh1j6QdQyWyVnG04sz7NMWkCX1p3WZniRND2i2RXmUSM9/8AU4jhh2K6tWi3F5dStQpLHo+uCWwW4rNGwoV4X5y/C7uAqvReSkKFEvc02IWsAmQxzcZyq8SyVfYWAK/hvdI80QGgEi8auMpgADYJE4ilE5S2ovS0vclngKNuhWcX4hAh3w0l2ImZMc6VQ0ESmMyE+0RGc2C+MHULg4EdIkzF1onSVOreho8GUFjXsvw3SEy68LwmW1NQZCUt6FstohXi0Uc0mZ5vFswQScHNrLfNYuT5O72o1XRH/EGaz2+SSueasXw/3O80kt+p5/0c/wDi/X/QiLYjIkgEAy15yQUaxQg0ucxkgCTNrcAJnJWdoilx2CfX1ZKi5Y2nm7FHIoXMLBvf0fFeZqpPVUYMtNqNyPNm2ov6REpkmlKEmVOC7zssKnUQobNFkJFk9xFOIRDbS0D/AEiRKRBLDP8At9SXqnMkbjk4L9ihk4gxG/3FWNhFyLT3p8aEKu5BfzLK8SldimUyMHNGEspqxiwy0g6iD4LKXJ3abuKL97TLDDuPqfUnWG1ZHXLyRFkcHNE6iXEFB2uyljjLAjtCokKt8C80yxFepVhbMblZQo/sE4OEuvL1sUVos8jsPePXagE6BrCcW8Ov0EzScOofrx3jH1tXSLrhw8kZGZehnZXzRVqh3Tsg0VHuuG/sKu4sOlMqjcfLBZeCZGWpaiyRb7Acx2jPzRB9BqLsEtDZ19TzVRpGAR0m5K9itkZHA+ghXwpzB6/2TasmLoH0HpQNocD449au41kBN5p2iSx9qgmG4jKcwrvQulKBjssNyUX0xzj2i0iQSRPPPb1KujtrKQBwrgdh2bcaK4DWnpA/ug7dAlXEGlcOv1kFTITKqG66ZVuzrmWnqx8VQ8oeTlDGgCgq6GDhtZrGxacM18Tnsd4HuNDFEic0J9KWO1u2WY2hCdBKKmeX3l1hWo5VcnXPabRZrs6uiQ6yOZdDu9c2y4YLBxosUCZLB1vW6dnHKLi6ZqW2uzCyvvsDnVM7xa4Opd6QkADTtSsum2GzvYCIZdMUIiTd7tQ6pBrNZTRHTcIsaGXwQ4gk+w4gYAHGRIyPetUTZXEGHBaDdJLZ9EiUhOEDIZU6lhM7NLjBR6bt9oeyJZ2ipDHEMAdeaJOBd0iB1IvQuljGNzmxDezokH3g6VJUIxnPclpm2woEaEYUIQnvcC4hpay6WkEhuAcCKSxnlNN0nZw9wuR2hhnOYb7oFZNlMYCWIOZol0axTu7/AJLz+Hu1w+Lf1LqA+p2n4hx/ZJT+zW5eTavdMrHfSPG/lQoXxvLjuYKdp7FsgvPOXEe9aw3JjNeZM15npfy1bOXUVRozrIU6GXFccylEVzrRIyBrhX1wSiQzKciQdozqJVmaL1rOejZ/Rm08xH1c6yQ1dET8OCurawdvigPo1gSgPcTIOiUGsBoqry1wG1kR6JUvJ1aTpEmhYn8sbJjqwVw6HfZXEeis5op8m7Lzh4rQaPjVkU48DkslbaYZDXD4TeHj4ouFED27cRvH7Ii2wc5bDuVRY4hhuu6ijgXKCLZZ5tmN/WFywPrI5qxhAEEZYjcVWOhXXEaj2HFAWCWuFdPYrDQ1pkQOr16yTbUy8A7WK78/WxV8I3XKeHZfyVGmtMKYl62+tyBY+dD7Tcdo1o+BEvwwc8Dvy4oG3NIIe3Ed2YVsyXgi0hZb7NowVDMtM1qbI8OG/vVRpCxgONMfR3KZLs0jKsMM0XpSVHGec/BXQiNe2hFRRYIzBkcVaaJtxHRJzmD3oUumEodovItneMvHjs2oJxOMptzGEto1dVD2Kzs1oLgHA1w38c0x8e/Mw3tc4e6aGYxBngqITKERHQ3a2mtOwga9YWS5f6CNz6xCAun/AFA3AfeAyGsZHetpFiBxc0sLX4lpEv6mnVNKE4wiGuE2ux1VxmknRU4qSyfPTnua4EOIkZzGWuQ1yWpNvgQnw4kJ0yRWsztJmaVlmm8veS77JFc9rD9Xcf5bwZgT9w6iKynlLFVGgbVdD4YZevEGRcGtlIgzVNWjCD2ujVaZ0zOC2G5jmtvX5ukeldcBImciZmlBJqboyNBeyTgGuFL1Js219rcUJa4TWMY5hDukA2GBNpJBnL3g4SONEXZoVnECJEjwiCQ6pm1xIPRDdWW+ZUUdG6gX667/AJLeH/5XUP8AWbJ9g/52pI2GPu/2zeu5UQOdDASQTIvoGjjjvXnmkLa+LHixAGEOe6V5pNAZDAiifOShcwCuR78/Nav0MNBbofs5lrueGMY54MyIZ/pd+pK0R3u+yph0CKYfEnkqN0pKDQ9P5BBxsUM/eeDLD2pYK3iQ+l0hryG1VPIJv/sGSBq9/wD3q+iA3hicfFI6Y8FXo1s3RGimBqN/7cFcQBdkZ5hVo6MeQ94Ed58EeJ1rtSiVIuYgvNVFpGB7wxGPUrmyRJgKG1srv9FU8kJ0wHRlqqAdx3HBH2yBOvrUVSWiGWGYwwV5YI4iMGvApJ9Dl5A4A6LmnIn90Ha4FJjEKyuXXGZ1eXh2qN0OstdPLw4IasE6ZHoG0dIsODhTejrQzES/yMeyqpCDDfPUVoI7pgOGff6p1oiEubKqzxLrth9fvxR9tghw34bwgLUyTthqNmv1vR1kiXmSOVPIpoT8lJbLFOox9cUAWyrhL1VaWLD4+PgCFWWyyjEYesVLiXGRLo+2VqccfWQRuk2RABHgEOLR02SnfGsHG8O1Z28WmStNFW8gynXJCYNVlEcXSsnQ4paCyUnE+7OXAaztVxGc1wHsFpExKvAjvQ1osEJzXOkamoGAniRqBqq6zxhA/lkOME1a4DCZqCBWWNU/5JdPKFbYUKLDfAitvQn0IOWYI1OBkQRgvGNP6EiWG0hprIh8N0qRGg0O/IjJer6f03BgNLz0T7tKk6mNOJ4ALyzlDpiJa3hz6NbO43UDKczmTIKkY6jX7B7bp+LEvdFoJLSCCQWylMTzBz3ozSOln2ljIbmhrWG9TEmUsdyp2QkdBkFVIyc2zv8AD26u0+a6iudCSZmcBquiswcDTdt3hNmur02rVMw4BXzBIIqEwkouPCLm0IBGsGo6sx3blAbO6U77OB9f5XmakHCVHVCVo9R+jyPPR41tiPB+YHuKvLS5ziJGY3jUVn/o1pYYoMjKI40/CDgtBFxEterYVkzrhwVcVha9rjKhGumI8VftBoadaoNLA3Xa5alf2XpQwdgSXJcuAiESDu3KS1CbZ6q+aYBn49RTn03KiAG0Q5jvQmj7QYcSRwKsHtAmMsOr/Hcq+3waXx193kk/JSL2O28A7+k9eHbJBxhgdna1c0Na7wLTqRVphSns6Q8UyOMAlus99ocE7RcW9DLTkpbGRVh/E3ccQohBuRNhqNmv1tQO+htrZMU3jePXem2GLI7DT1uKIiNx4+uvvQd3pSGcyNhzQAdEH7+Hrahntx29h/fHiiL0wDngVHEHA068igRS2yDLLcPWCDZNsitBFYCKjf6zVZHsur9zsGxS0aRYfo63A0MiMDPCRyWV+kTlFHsTmw4MOkQTbFf0htAaD7Q27MVZw2yoP8fuucp7JBi2CI2O6VzpsdMTa8YATxJnLcU4sjUWMHjMWLEivMSI4vccz4ahsUrYMyixZWjB7pf0+SkZZ2/G7j+y0s5GgdkFTsg7ApmwWT9p3zFTNawZu+Z/mixEPNjaki/5f3vnf+pJFhRXESMpg7Rh1TXQuwoRcZAT9a1JHaGybOZzXf7iTUezLY2tw1plUIO1Mumnsmo2ax1eIRDnSBOACBdpNp6LReB940kdgzUeo2tfYadpnpv0UPLrPaG5XiRvuBapzSXU1jHcVmfogfOFGbnfnxaFp9Kh0+jOfRwntHiuBno6fADpOzuk4znQZI7QT5wWz1SOeFFQx+caDzjiZUlImRkD4q25MuPNylhlsKlcmj+JcQxsPWuuwl1ZJ1zt2hcefA+pKjMhxHV3KBjalhwImPHwU4Euo96hjQ6TGLTqyKAKq86E/caLSQYwewOGXdmFU22FfaDngUJo7SBhPDTgaKeCmrRdRW3TMUu1H4UWQHBRNitIBEv2OPamsddpOmW713BWQPDJjaO0fug7UzV1b/GY8UZ9YE9uzt802MwEevWPekCIYbsDgDLjkpjDmPU/QQQpjgeM86dqMhRKIAa1tT2+aAtr5UAr67FLaY9aGQwP7JkVs8q9+85oCyoimW/1gPh2rD8sdJmJEEFpkyHKeovIxpqBlvmtxp23Ns0B8R1TLoffdk3YPBeUiIXEucJucSTtJqUorJOpLFHDAOsJzYJ1jtUgOztTwdivJhSGtgn4m9vkn81T2hwK5PYeKcHbErCkP5naEk68up2FElsiBglSZyEu2SoLXpANJ95xy27dSHi2x7yQybRmTid2pRwbMBvWkWoLHPkNSbm/ojiRHRD070vhAMh5qaG9gyf8qlkk51Z+WrUobvklYPQfogtwDo7QCPYMyLuN4S30Xp0eHfq10qEGUp7JHIryf6Npyin77B1XSvUbO4ATJkNpUHTD4or7ZZXOBBADhW8AJPA16jJAaItI51zQQRIYGeMx5K9i6Sgk3Wm+dTelrxJoOKz8QXbSRIAXCT1EakmaxfRpob6LuPUZdRUNlidUxsCmJznQ0PhkmQRP6JFBI0PgozMO30wnuxRMVl5sp9+IQcQTbWcxszHooGdLcRQZio9alXW2ACJ4H1NWkMh7Q4ATGPj4qKMJTyBr6kkHBX6NjEG6cO3gibQC26fd35H95KCK0gh0ideU/Q7kYZSkSLpodk8DxQkNjYbjLd4bdyJZE1YY+idiGbApMTOR3j12hE2eUpegmJkT4gnLE4+Shh2kkyOE5HwRdpLAK9nmg+YmZ6+/dmgROYer1jVD27SEOzwzFimTW55vOQYMXFE2yO2HDMSIbrGtma5DvOxeN8puUL7ZFvmYhtpDYfdGs/eOeKdESlR3lDyhjWuLfMJoY2fNsL29EHM63GQmq4RYkv8ASZ87VHzg+Eb6+afzg9FUqMG28kjXxj/ts+YLoiRcLjJ/iHkk2I30UnPGtPAsnHRYmFyFP8U/BcMaMPdhcXeSkDm5YqRr9qBEPPR/hh8XJI3nkkYDJRBKaRBSlvUlCCIhQwZGWFTSY4alA4jIS6z4roeNR7kmNFxobTRs19rBeDiCWkOFRqIwpvVseWTc4AB/F5tWPfEGTZdZUcTaO9JxNFqNLBtofLOdRBn/AFn9NEZoLlCY1rh9EsBa9pm4unORpMUw2rAtitHudqI0bpAQo0OIGmTXCeJMjQy2yn2JbSvdfZ7rZnUpM7aDflsmi2idJDvWK0dy7sTqOjlrvvsfLicB5LQWTTEGKP5dphv1XHNmRuJnNM054L6E0y9YoW1QJOnr2pQI+p08M5010KJcbzSPXaUCooy8wXz90qzdJzQ5vlu8EPFjCUnlnj1SVdZ9JCC4gG+x1ZSNEuCuQ6LZpg0riJ+vU1NAhgtpgRtQrdMtOV3gCcj62qKE4m81pc4gzEpkHhT/ACmJhro10zOdDIZjOuCY+0uOobu2u0VUBY84QxWU56xunkhbTboVnrHjwmfic2f9MMGZOCBB0OyyJJzzOA49SbpG3wrOwxYrrre1x1NGLj2LG6Z+kKE0SszHxX5RIokxu1rMSeEliLZpSNGeXxor3k65kNn8LZyb1BMhzSLrlJyjjW53NiTYIcC2GJm8ci92fYB2qrdocgkTqACdYBOOojcUFfMwQ4g4TE8OKbedOYc7VtRTMW7JYcG68guoJiYPBWEKwMdTnKn2ekJ9YKqJk4zO390+FEkZz7E6Cyzi6GANXEUmcKSnOgqckF9VbMi8DLqnunil9ZmbxeZ68T2lRmKJzmOAlwQkKyRsESxClZDBQ4jtrUcf3XG2oDBzRjmnQrD+ZG3ikg/rbdbeJ80k6DJXlgnnxK7zW/5ilOq7eSYJnXQ9c/mKbzO08U4OXZqSiIw9p4pOhGQqeKeSkEwIub2nsSc3UT2eSkcF1+uY4juTECFh19g8kwQTkais6T44oqSV1AjkG2WhhmyPEbueVb6O5YaQhezaXEangOHaJ9qqebUjAEFbmuzYQPpItY9qDAcdciKZhdf9IUcmZs8GWol1BvWSvLk0qK9yRrXcvo/uQIDTjMhzvKSCjct7eRIRms/DDZ/5AqgntXLyKD3JeSyj6ctkWj7VFcMwHBo4MAVeCQcSc6k9800OXQUURuY8XZYV3nzTRd+Bvb5rt9cmgBwc34G8PNK8PgZ8o4Jpcle2piJOcHwM29BkuEkg8fBD+Rnkk2JLP91znEAPa4fC35GeS5f/AA/Iz9KbzqXOBAD3R3bPkZ5Lv1l2Uvlb5KMPC618uvYmII+sv9BvkuqDnEkABpzUkkAIJySSllDXJJJIQxqa7FJJNcC7EE4JJIESNT0kkAdCQSSQwGnFNSSQNDglmkkgQ5y4FxJAHWJ7V1JAHHZJqSSGJDnpoxSSQhseo2pJJiHpJJJDP//Z",
      rating: 4.5,
      reviews: 67,
      category: "Women"
    },
    {
      id: 6,
      name: "Designer Handbag",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=500&fit=crop",
      rating: 4.9,
      reviews: 45,
      category: "Accessories",
      isNew: true
    },
    {
      id: 7,
      name: "Kids Comfortable Jeans",
      price: 34.99,
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=500&fit=crop",
      rating: 4.4,
      reviews: 78,
      category: "Kids"
    },
    {
      id: 8,
      name: "Premium Watch",
      price: 299.99,
      originalPrice: 399.99,
      image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=500&fit=crop",
      rating: 4.8,
      reviews: 112,
      category: "Accessories",
      isSale: true
    }
  ];

  // Sorting logic for featured products (always show featured order)
  const sortProducts = (products: Product[]) => {
    return products.sort((a, b) => {
      // Featured order: Hot items first, then New, then Sale, then regular
      const getPriority = (item: Product) => {
        if (item.isHot) return 4;
        if (item.isNew) return 3;
        if (item.isSale) return 2;
        return 1;
      };
      return getPriority(b) - getPriority(a);
    });
  };

  // Sort products for featured display
  const sortedProducts = sortProducts(products);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-5, 5, -5],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  };

  const handleAddToCart = (item: Product) => {
    console.log('Adding to cart:', item.name);
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category,
      subcategory: item.category
    });
    
    setAddedToCart(prev => [...prev, item.id]);
    
    setTimeout(() => {
      setAddedToCart(prev => prev.filter(id => id !== item.id));
    }, 2000);
  };

  return (
    <section 
      className="py-20 bg-gray-50 transition-all duration-300" 
      style={{ 
        backgroundColor: '#fff7ed',
        '--tw-bg-opacity': '1'
      } as React.CSSProperties}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked collection of premium fashion items that combine style, comfort, and quality.
          </p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {sortedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              variants={cardVariants}
              whileHover={{ 
                scale: 1.05,
                rotateY: 5,
                rotateX: 5,
                transition: { duration: 0.3 }
              }}
              onHoverStart={() => setHoveredProduct(product.id)}
              onHoverEnd={() => setHoveredProduct(null)}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
              style={{
                perspective: "1000px",
                transformStyle: "preserve-3d"
              }}
            >
              {/* Product Image */}
              <div className="relative h-64">
                <img
                  src={product.image || '/images/placeholder-product.jpg'}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-t-lg"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/images/placeholder-product.jpg';
                  }}
                />
                
                {/* Overlay with quick actions */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredProduct === product.id ? 1 : 0 }}
                  className="absolute inset-0 bg-black/20 flex items-center justify-center"
                >
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-700 transition-colors duration-300"
                  >
                    Add to Cart
                  </button>
                </motion.div>

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col space-y-2">
                  {product.isNew && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full"
                    >
                      NEW
                    </motion.div>
                  )}
                  {product.isSale && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full"
                    >
                      SALE
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500">
                    {product.category}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>

                <div className="flex items-center space-x-2">
                  <span className="text-xl font-bold text-gray-900">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>

                {/* Add to Cart Button */}
                <div className="mt-4">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-semibold transition-all duration-300 ${
                      addedToCart.includes(product.id)
                        ? 'bg-green-600 text-white'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    {addedToCart.includes(product.id) ? (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Added to Cart!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-5 h-5" />
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Floating effect - disabled to prevent interference */}
              {/* <motion.div
                variants={floatingVariants}
                animate="animate"
                style={{ animationDelay: `${index * 0.2}s` }}
                className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"
              /> */}
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <motion.a
            href="/all-products"
            whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            View All Products
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProducts; 