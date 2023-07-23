import path from 'path'

const parseFile = (fileName) => {
    const file = path.parse(fileName).ext
    return file
}

export default parseFile
