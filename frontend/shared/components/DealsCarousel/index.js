// Components
import { Typography } from 'antd';
const {Title} = Typography;

// Style
import { CardsContainer, CardSpacer, Card } from './Styles'


export const DealsCarousel = ({scroll}) => {
  const deals = [
    {
      name: 'Paris',
      link: '',
      image: 'paris.jpg'
    },
    {
      name: 'Cairo',
      link: '',
      image: 'cairo.jpg'
    },
    {
      name: 'New York',
      link: '',
      image: 'newyork.jpg'
    },
    {
      name: 'Cancun',
      link: '',
      image: 'cancun.jpg'
    },
    {
      name: 'Hong Kong',
      link: '',
      image: 'hongkong.jpg'
    }
  ]

  const animationOffset= [0, 50, 100, 30, 100]

  return(
    <CardsContainer>
      {
        deals.map((deal, index) => {
          return (
            <CardSpacer
              offset={animationOffset[index]}
              key={index}
            >
              <Card
                href='/'
                image={deal.image}
              >
                <Title level={4}>{deal.name}</Title>
              </Card>
            </CardSpacer>
          )
        })
      }
    </CardsContainer>
  )
}