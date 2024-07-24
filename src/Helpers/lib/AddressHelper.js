const AddressHelper = () => {}

const deg2rad = deg => {
  return deg * (Math.PI / 180)
}

/**
 * @description function to calculate distance between two lat long
 * @param {*} lat1
 * @param {*} lon1
 * @param {*} lat2
 * @param {*} lon2
 * @example
 * 1. AddressHelper.getDistanceInKm(24.8607, 67.0011, 24.8607, 67.0011) => 0
 * 2. AddressHelper.getDistanceInKm(24.8607, 67.0011, 24.8607, 67.0012) => 0.01
 * @returns {string} distance in km
 */

AddressHelper.getDistanceInKm = (lat1, lon1, lat2, lon2) => {
  const R = 6371 // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1) // deg2rad below
  const dLon = deg2rad(lon2 - lon1)

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const kms = Math.round(R * c) // Distance in km

  return kms < 1 ? `< 1` : kms
}

/**
 * @description function to calculate distance between two lat long
 * @param {*} lat1
 * @param {*} lon1
 * @param {*} lat2
 * @param {*} lon2
 * @example
 * 1. AddressHelper.getDistanceInMiles(24.8607, 67.0011, 24.8607, 67.0011) => 0
 * 2. AddressHelper.getDistanceInMiles(24.8607, 67.0011, 24.8607, 67.0012) => 0.01
 * @returns {string} distance in miles
 */

AddressHelper.getDistanceInMiles = (lat1, lon1, lat2, lon2) => {
  const R = 3958.8 // Radius of the earth in miles
  const dLat = deg2rad(lat2 - lat1) // deg2rad below
  const dLon = deg2rad(lon2 - lon1)

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const miles = Math.round(R * c) // Distance in miles

  return miles < 1 ? `< 1` : miles
}

module.exports = AddressHelper
