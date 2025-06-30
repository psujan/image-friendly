import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Container,
    Grid,
    Box,
    Avatar,
    Button
} from '@mui/material';
import {styled} from '@mui/material/styles';
import AspectRatioIcon from '@mui/icons-material/AspectRatio';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CompressOutlinedIcon from '@mui/icons-material/CompressOutlined';
import CropOutlinedIcon from '@mui/icons-material/CropOutlined';
import SlideshowOutlinedIcon from '@mui/icons-material/SlideshowOutlined';

import {
    Home as HomeIcon,
    FolderOpen as ProjectsIcon,
    AutoAwesome as AIIcon,
    Inventory as StockIcon,
    Add as AddIcon,
    MoreHoriz as MoreIcon,
} from '@mui/icons-material';

const sidebarItems = [
    {icon: <HomeIcon/>, label: 'Home', active: true},
    {icon: <ProjectsIcon/>, label: 'Slideshow'},
    {icon: <StockIcon/>, label: 'Gallery'},
];

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function Homepage() {
    return (
        <Box sx={{display: 'flex', minHeight: '100vh', bgcolor: '#f8f9fa'}}>
            {/* Sidebar */}
            <Box
                sx={{
                    width: '80px',
                    bgcolor: 'white',
                    borderRight: '1px solid #e0e0e0',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    py: 2
                }}
            >
                {sidebarItems.map((item, index) => (
                    <Box
                        key={index}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            mb: 3,
                            cursor: 'pointer',
                            color: item.active ? '#4A90E2' : '#666',
                            '&:hover': {color: '#4A90E2'}
                        }}
                    >
                        {item.icon}
                        {item.label && (
                            <Typography variant="caption" sx={{mt: 0.5, fontSize: '10px'}}>
                                {item.label}
                            </Typography>
                        )}
                    </Box>
                ))}
            </Box>

            {/* Main Content */}
            <Box sx={{flex: 1, display: 'flex', flexDirection: 'column'}}>
                {/* Header */}
                <AppBar position="static" elevation={0} sx={{bgcolor: 'white', color: 'black'}}>
                    <Toolbar sx={{justifyContent: 'space-between'}}>
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 'bold',
                                color: '#4A90E2',
                                letterSpacing: '0.5px'
                            }}
                        >
                            IMG Friendly
                        </Typography>

                        <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
                            <Avatar sx={{bgcolor: '#4A90E2', width: 32, height: 32, fontSize: '14px'}}>
                                S
                            </Avatar>
                        </Box>
                    </Toolbar>
                </AppBar>
                <Box sx={{padding: "10px"}}>
                    <Container maxWidth="100%" sx={{py: 4, flex: 1}}>
                        <Box sx={{mb: 6}}>
                            <Typography
                                variant="h4"
                                sx={{
                                    fontWeight: 600,
                                    color: '#333',
                                    mb: 4
                                }}
                            >
                                Hi! How can I help you ?
                            </Typography>

                            {/*App Options Card*/}
                            <Box sx={{width: '100%', px: 2}}>
                                <Grid container spacing={2}>
                                    {[{
                                        text: 'Resize Image',
                                        icon: <AspectRatioIcon size={16}/>,
                                    },
                                        {
                                            text: 'Compress Image',
                                            icon: <CompressOutlinedIcon/>,
                                        },
                                        {
                                            text: 'Crop Image',
                                            icon: <CropOutlinedIcon/>,
                                        },
                                        {
                                            text: 'Create Slideshow',
                                            icon: <SlideshowOutlinedIcon/>,
                                        }
                                    ].map((item, i) => (
                                        <Grid item xs={12} sm={6} md={4} key={i}>
                                            <Box
                                                sx={{
                                                    backgroundColor: 'white',
                                                    border: '1px solid #e8eaee',
                                                    height: '100px',
                                                    p: 1,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    borderRadius: 2,
                                                    minWidth: '230px'
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        backgroundColor: '#f4f4f4',
                                                        p: 2,
                                                        borderRadius: 2,
                                                        mr: 1.5,
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    {item.icon}
                                                </Box>
                                                <Typography variant="h6" className="title-text-bold">
                                                    {item.text}
                                                </Typography>
                                            </Box>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>

                            {/*  Upload  */}
                            <Box sx={{width: '100%', mt: 3, display: 'flex', justifyContent: 'center', p: 2}}>
                                <Button
                                    component="label"
                                    role={undefined}
                                    variant="contained"
                                    tabIndex={-1}
                                    size={'large'}
                                    startIcon={<CloudUploadIcon/>}
                                >
                                    Upload Image
                                    <VisuallyHiddenInput
                                        type="file"
                                        onChange={(event) => console.log(event.target.files)}
                                        multiple
                                    />
                                </Button>
                            </Box>

                        </Box>
                    </Container>
                </Box>
            </Box>
        </Box>
    );
}