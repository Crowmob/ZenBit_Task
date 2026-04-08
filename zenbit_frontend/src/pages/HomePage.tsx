import { Box, Button, Typography } from "@mui/material";
import background from "../assets/background.jpg";
import item1 from "../assets/item1.png";
import item2 from "../assets/item2.png";
import item3 from "../assets/item3.png";
import item4 from "../assets/item4.png";

const MockedData = [
    { image: item1, name: 'The Marina Torch', price: '6 500 000 Dhs', tiketPrice: '60 000 Dhs', yield: 9.25, daysLeft: 150, sold: 75 },
    { image: item2, name: 'HHHR Tower', price: '6 500 000 Dhs', tiketPrice: '60 000 Dhs', yield: 9.25, daysLeft: 150, sold: 75 },
    { image: item3, name: 'Ocean peaks', price: '6 500 000 Dhs', tiketPrice: '60 000 Dhs', yield: 9.25, daysLeft: 150, sold: 75 },
    { image: item4, name: 'Al Yaqoub Tower', price: '6 500 000 Dhs', tiketPrice: '60 000 Dhs', yield: 9.25, daysLeft: 150, sold: 75 }
]

const HomePage = () => {
  return (
    <Box>
      <Box
        sx={{
          width: '100%',
          height: '100vh',
          backgroundImage: `url(${background})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'center',
          color: 'white',
          gap: 3,
        }}
      >
        <Typography variant="h2" sx={{ textAlign: 'center' }}>
          The chemical negatively changed
        </Typography>

        <Box sx={{ textAlign: 'center', width: { xs: '90%', sm: '80%', md: '60%' } }}>
          <Typography variant="h6">
            Numerous calculations predict, and experiments confirm, that the force field reflects the beam, while the mass defect is not formed. 
            The chemical compound is negatively charged. 
            Twhile the mass defect is 
          </Typography>
        </Box>

        <Button sx={{ border: '2px solid white', color: 'white', p: 1 }}>Get started</Button>
      </Box>

      <Box sx={{ p: 5 }}>
        <Typography variant="h4" sx={{ color: '#B29F7E' }}>
          Open deals
        </Typography>

        <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap', pt: 2 }}>
          { MockedData.map((item) => (           
            <Box sx={{           
              backgroundImage: `url(${item.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              width: 630, 
              height: 400, 
              borderRadius: 5,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              p: 2
            }}>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold' }}>
                  {item.name}
                </Typography>

                <Typography variant="h6" sx={{ color: 'white' }}>
                  {item.price}
                </Typography>

                <Typography variant="h6" sx={{ color: 'white' }}>
                  Ticket - {item.tiketPrice}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" sx={{ color: 'white' }}>
                  Yield: {item.yield}%
                </Typography>

                <Typography variant="h6" sx={{ color: 'white' }}>
                  Days left: {item.daysLeft}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" sx={{ color: 'white' }}>
                  Sold: {item.sold}%
                </Typography>

                <Typography variant="h6" sx={{ visibility: 'hidden' }}>
                  Spacer
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default HomePage;