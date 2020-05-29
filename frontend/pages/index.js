// Components
import { Layout, Typography } from 'antd';
import { HeaderNav } from 'shared/components/HeaderNav';
import { SearchForm } from 'shared/components/SearchForm';
import { DealsCarousel } from 'shared/components/DealsCarousel';
import { ReusableHead } from 'shared/components/ReusableHead';
import { ReusableFooter } from 'shared/components/ReusableFooter';

const { Header, Content } = Layout;
const {Title} = Typography;

// Styles
import { HomeSearch, Section, SearchContainer } from 'shared/styles/pages/homepage'

// Hooks
import { useInitialValuesFromQuery } from  'shared/hooks/useInitialValuesFromQuery';



// Main functional component
export default function Home() {

  const initialValues = useInitialValuesFromQuery();

  return (
    <>
      <ReusableHead title='Flights.rip | Find your next flight' />

      <Layout>
        <Header>
          <HeaderNav />
        </Header>

        <Content style={{ background: '#fff' }}>
          <HomeSearch>
            <SearchContainer>
              <Title>Where to next?</Title>
              <SearchForm
                initialValues={initialValues}
              />
            </SearchContainer>
          </HomeSearch>
          <Section>
            <Title level={2} >Ready for an adventure? Start booking!</Title>
            <DealsCarousel />
          </Section>

        </Content>

        <ReusableFooter />
      </Layout>
    </>
  )
}
