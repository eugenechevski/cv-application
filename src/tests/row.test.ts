import Row from "src/row";

it('Tests Row data structure', () => {
    const myRow = Row({});

    // Tests getAllFields()
    expect(myRow.getAllFields()).toStrictEqual([]);
    
    // Tests addField()
    expect(myRow.addField('name')).toBeTruthy();
    
    // Tests getFieldValue()
    expect(myRow.getFieldValue('name')).toBe('');

    // Tests EditField()
    expect(myRow.editField('name', 'John')).toBeTruthy();
    expect(myRow.getFieldValue('name')).toBe('John');
    expect(myRow.getAllFields()).toStrictEqual(['name']);
    
    // Tests removeField()
    expect(myRow.removeField('name')).toBeTruthy();
    expect(myRow.getFieldValue('name')).toBeUndefined();
    expect(myRow.getAllFields()).toStrictEqual([]);
    
    // Tests createInstance()
    expect(myRow.addField('name', 'John')).toBeTruthy();
    expect(myRow.addField('age', '12')).toBeTruthy();
    expect(myRow.addField('country', 'United States')).toBeTruthy();
    expect(myRow.addField('height', '5.8')).toBeTruthy();
    
    const freshCopy = myRow.createNewInstance();
    const fields = freshCopy.getAllFields();

    expect(fields).toStrictEqual(['name', 'age', 'country', 'height']);
    expect(() => {
        fields.forEach(field => {
            if (freshCopy.getFieldValue(field) !== '') {
                return false;
            }
        });

        return true;
    }).toBeTruthy();
});