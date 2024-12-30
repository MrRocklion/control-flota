export default function GreenButton(){


return(
    <>
    <Grid size={{ xs: 12, md: 2 }}>
        <button type="button" onClick={getData} className="w-full px-5 py-2.5 text-sm font-medium text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 rounded-lg text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Traer Datos </button>
    </Grid>


    </>
);


}