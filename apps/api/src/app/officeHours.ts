import { Express } from 'express';

interface OfficeHours { 
    name: string;
}

const officeHours: OfficeHours[] = [{ name: 'Brian Tedder' }, { name: 'Mario Mui' }, { name: 'Vicky Hu' }];

export function addOfficeHour(app: Express) {
    app.get('/api/officeHours', (req, resp) => resp.send(officeHours));
    app.post('/api/addOfficeHours', (req, resp) => {
        const newOfficeHour = {
            name: `Mark Hansen`,
        };
        officeHours.push(newOfficeHour);
        resp.send(officeHours);
    });
}