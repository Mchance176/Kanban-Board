import { Model, DataTypes } from 'sequelize';
export const TicketFactory = (sequelize) => {
    class Ticket extends Model {
    }
    Ticket.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'todo',
        },
        assignedUserId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'users',
                key: 'id',
            },
        },
    }, {
        sequelize,
        modelName: 'Ticket',
        tableName: 'tickets',
    });
    return Ticket;
};
