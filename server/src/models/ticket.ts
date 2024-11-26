import { Model, DataTypes, Sequelize } from 'sequelize';

export interface TicketAttributes {
  id?: number;
  title: string;
  description: string;
  status: string;
  assignedUserId?: number;
}

export const TicketFactory = (sequelize: Sequelize) => {
  class Ticket extends Model<TicketAttributes> implements TicketAttributes {
    public id!: number;
    public title!: string;
    public description!: string;
    public status!: string;
    public assignedUserId?: number;
  }

  Ticket.init(
    {
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
    },
    {
      sequelize,
      modelName: 'Ticket',
      tableName: 'tickets',
    }
  );

  return Ticket;
};

export type TicketModel = ReturnType<typeof TicketFactory>;
