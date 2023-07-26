export default function makeGetBootcampInRadius({
    bootcampsRepository,
    geocoder,
}) {
    return async function getBootcampInRadius(zipcode, distance) {
        const loc = await geocoder.geocode(zipcode)
        const lat = loc[0].latitude
        const lng = loc[0].longitude
        const radius = distance / 3963

        const bootcamps = await bootcampsRepository.findByQuery({
            location: {
                $geoWithin: { $centerSphere: [[lng, lat], radius] },
            },
        })

        return bootcamps
    }
}
