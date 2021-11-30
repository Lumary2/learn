import FilteredRecords from '@interfaces/FilteredRecords'
import MarkdownFileWithUrl from '@interfaces/MarkdownFileWithUrl'
import capitalize from '@util/capitalize'
import collectTags from '@util/collectTags'
import regexTestString from '@util/regexTestString'
import transformTag from '@util/transformTag'

const checkMatch = (string: string, tag: string): boolean | null => {
    const regex = /[A-Z]/g
    const matched = string.match(regex)

    return matched && matched.length > 1 && regexTestString(string, tag)
}

const filterRecordsWithTag = (records: MarkdownFileWithUrl[], tag: string): FilteredRecords => {
    const transformedTag = transformTag(tag)
    let titleTag: string = capitalize(transformedTag)
    const checkRecordSet = (record: MarkdownFileWithUrl, tag: string): boolean => {
        const recordTagSet = collectTags([record])
        const recordTagArray = Array.from(recordTagSet)
        
        return recordTagArray.some(item => {
            if (checkMatch(item, tag) && item.length === tag.length) {
                titleTag = item
            }

            return regexTestString(item, tag) && item.length === tag.length
        })
    }
    const filteredRecords = records.filter(record => checkRecordSet(record, transformedTag))

    return {
        records: filteredRecords, 
        title: titleTag,
    }
}

export default filterRecordsWithTag
