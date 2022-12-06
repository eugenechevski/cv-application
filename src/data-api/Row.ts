export default function Row(initFields: {[index: string]: string}): Row {
    var thisFields = initFields;

    /**
     * @returns all the field names of the row.
     */
    function getAllFields(): string[] {
        return Object.keys(thisFields);
    }

    /**
     * @param fieldName - the name of the field which value should be returned.
     * @returns the value of the field.
     */
    function getFieldValue(fieldName: string): string | undefined {
        return thisFields[fieldName];
    }

    /**
     * Adds a new field to this row if the field is not present already.
     * @param fieldName - the name of the field
     * @param initialValue - the initial value of the field
     * @returns boolean - true if the field was added, false otherwise
     */
    function addField(fieldName: string, initialValue?: string): boolean {
        var additionStatus = true;

        if (fieldName in thisFields) {
            additionStatus = false;
        } else {
            thisFields[fieldName] = initialValue === undefined ? '' : initialValue;
        }

        return additionStatus;
    }

    /**
     * Removes the field from the row if it is present.
     * @param fieldName - the name of the field to be removed
     * @returns boolean - true if the field was removed, false otherwise
     */
    function removeField(fieldName: string): boolean {
        var removalStatus = true;
        
        if (fieldName in thisFields) {
            delete thisFields[fieldName];
        } else {
            removalStatus = false;
        }

        return removalStatus;
    }

    /**
     * Edits the value of the field if it is present in the row.
     * @param fieldName - the name of the field which value is being edited
     * @param newValue - the new value of the field
     * @returns boolean - true if the field was edited, false otherwise
     */
    function editField(fieldName: string, newValue: string): boolean {
        var editionStatus = true;

        if (fieldName in thisFields) {
            thisFields[fieldName] = newValue;
        } else {
            editionStatus = false;
        }

        return editionStatus;
    }

    /**
     * Creates a fresh copy of the row with empty values of each field.
     * @returns a fresh copy of the row.
     */
    function createNewInstance(): Row {
        var initFieldsOfNewInstance = {};
        var currentFields = Object.keys(thisFields);

        for (var i = 0; i < currentFields.length; i++) {
            initFieldsOfNewInstance[currentFields[i]] = thisFields[currentFields[i]];
        }

        return Row(initFieldsOfNewInstance);
    }

    return {
        getAllFields,
        getFieldValue,
        addField,
        removeField,
        editField,
        createNewInstance,
    }
};  