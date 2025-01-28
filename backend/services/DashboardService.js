const { Op, col, fn, Sequelize, where } = require('sequelize');
const { Order, Orderitems, Product, Category } = require('../models');
const bcrypt = require("bcrypt");
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
var timezone = require("dayjs/plugin/timezone");
const isoWeek = require('dayjs/plugin/isoWeek');
const TIMEZONE = 'Europe/Berlin';
const { sequelize } = require('../models');

async function getAllOrdersData() {
    try {
        const currentDate = dayjs();

        // Zeiträume für den aktuellen Monat
        const startOfCurrentMonth = currentDate.startOf('month').format('YYYY-MM-DD');
        const endOfCurrentMonth = currentDate.endOf('month').format('YYYY-MM-DD');

        // Zeiträume für den letzten Monat
        const startOfLastMonth = currentDate.subtract(1, 'month').startOf('month').format('YYYY-MM-DD');
        const endOfLastMonth = currentDate.subtract(1, 'month').endOf('month').format('YYYY-MM-DD');

        // Anzahl aller Bestellungen in diesem Monat
        const currentMonthOrders = await Order.count({
            where: Sequelize.where(
                fn('DATE', col('order_date')),
                {
                    [Op.between]: [startOfCurrentMonth, endOfCurrentMonth],
                }
            ),
        });


        // Anzahl aller Bestellungen im letzten Monat
        const lastMonthOrders = await Order.count({
            where: Sequelize.where(
                fn('DATE', col('order_date')),
                {
                    [Op.between]: [startOfLastMonth, endOfLastMonth],
                }
            ),
        });

        // Prozentuale Änderung berechnen
        const percentageChange = lastMonthOrders === 0
            ? currentMonthOrders > 0
                ? 100 // Keine Bestellungen im letzten Monat, aber im aktuellen
                : 0  // Keine Bestellungen in beiden Monaten
            : ((currentMonthOrders - lastMonthOrders) / lastMonthOrders) * 100;

        // Zeitrahmen als String formatieren
        const formattedStartDate = dayjs(startOfCurrentMonth).format('DD.MM.YYYY');
        const formattedEndDate = dayjs(endOfCurrentMonth).format('DD.MM.YYYY');
        const timeRangeString = `${formattedStartDate} - ${formattedEndDate}`;

        return { data: currentMonthOrders, percentageChange: percentageChange, timeRangeString: timeRangeString, title: "Bestellungen in diesem Monat" };
    } catch (error) {
        console.error('Fehler beim Abrufen der Bestelldaten:', error);
        throw new Error('Fehler beim Abrufen der Bestelldaten.');
    }
}

async function getTodaysRevenue() {
    const currentDate = dayjs().format('YYYY-MM-DD');
    const yesterdayDate = dayjs().format('YYYY-MM-DD');

    const totalRevenueToday = await Order.sum('total_price_float', {
        where: Sequelize.where(
            fn('DATE', col('order_date')),
            currentDate
        ),
    });

    const totalRevenueYesterday = await Order.sum('total_price_float', {
        where: Sequelize.where(
            fn('DATE', col('order_date')),
            yesterdayDate
        ),
    });

    const percentageChange = totalRevenueYesterday === 0
        ? totalRevenueToday > 0
            ? 100 // Keine Bestellungen gestern, aber heute
            : 0  // Keine Bestellungen an beiden Tagen
        : ((totalRevenueToday - totalRevenueYesterday) / totalRevenueYesterday) * 100;


    const roundedTotalRevenue = totalRevenueToday !== null ? totalRevenueToday.toFixed(2) : '0.00';

    return { data: roundedTotalRevenue, timeRangeString: dayjs().format('DD.MM.YYYY'), percentageChange: percentageChange, title: "heutige Einnahmen" }

}

async function getNewCustomersFromThisMonth() {
    const currentDate = dayjs();

    // Zeiträume für den aktuellen Monat
    const startOfCurrentMonth = currentDate.startOf('month').format('YYYY-MM-DD');
    const endOfCurrentMonth = currentDate.endOf('month').format('YYYY-MM-DD');

    // Zeiträume für den letzten Monat
    const startOfLastMonth = currentDate.subtract(1, 'month').startOf('month').format('YYYY-MM-DD');
    const endOfLastMonth = currentDate.subtract(1, 'month').endOf('month').format('YYYY-MM-DD');


    // Anzahl aller Neukunden in diesem Monat
    const currentMonthNewCustomers = await Order.count({
        where: Sequelize.where(
            fn('DATE', col('createdAt')),
            {
                [Op.between]: [startOfCurrentMonth, endOfCurrentMonth],
            }
        ),
    });

    // Anzahl aller Neukunden im letzten Monat
    const lastMonthNewCustomers = await Order.count({
        where: Sequelize.where(
            fn('DATE', col('createdAt')),
            {
                [Op.between]: [startOfLastMonth, endOfLastMonth],
            }
        ),
    });

    const percentageChange = lastMonthNewCustomers === 0
        ? currentMonthNewCustomers > 0
            ? 100 // Keine Neukunden im letzten Monat, aber im aktuellen
            : 0  // Keine Neukunden in beiden Monaten
        : ((currentMonthNewCustomers - lastMonthNewCustomers) / lastMonthNewCustomers) * 100;

    // Zeitrahmen als String formatieren
    const formattedStartDate = dayjs(startOfCurrentMonth).format('DD.MM.YYYY');
    const formattedEndDate = dayjs(endOfCurrentMonth).format('DD.MM.YYYY');
    const timeRangeString = `${formattedStartDate} - ${formattedEndDate}`;

    return {
        data: currentMonthNewCustomers,
        percentageChange: percentageChange,
        timeRangeString: timeRangeString,
        title: "Neukunden im Monat"
    }

}

async function getOrderChartData() {
    dayjs.extend(isoWeek);
    dayjs.extend(utc);
    dayjs.extend(timezone);

    const startOfWeek = dayjs().subtract(1, 'week').startOf('isoWeek').tz('Europe/Berlin').format('YYYY-MM-DD HH:mm:ss');  // Montag
    console.log(startOfWeek);
    const endOfWeek = dayjs().subtract(1, 'week').endOf('isoWeek').tz('Europe/Berlin').endOf('day').format('YYYY-MM-DD HH:mm:ss');  // Sonntag
    console.log(endOfWeek);
    const ordersPerWeek = await Order.findAll({
        attributes: [
            [fn('COUNT', col('*')), 'order_count'],  // Zähle die Anzahl der Bestellungen
        ],
        where: {
            order_date: {
                [Sequelize.Op.between]: [startOfWeek, endOfWeek], // Zeitraum der letzten Woche
            },
        },
        group: [fn('DATE', col('order_date'))], // Gruppiere nach Datum
        order: [[fn('DATE', col('order_date')), 'ASC']], // Sortiere nach Datum
        raw: true,
    });
    const orderCounts = ordersPerWeek.map(item => item.order_count);

    const formattedStartDate = dayjs().subtract(1, 'week').startOf('isoWeek').format('DD.MM.YYYY');
    const formattedEndDate = dayjs().subtract(1, 'week').endOf('isoWeek').format('DD.MM.YYYY');
    const timeRangeString = `${formattedStartDate} - ${formattedEndDate}`;


    return { orderCounts: orderCounts, timeRangeString: timeRangeString };
}

async function getQuantityByCategory() {
    dayjs.extend(isoWeek);
    dayjs.extend(utc);
    dayjs.extend(timezone);

    const startOfLastMonth = dayjs().subtract(1, 'month').startOf('isoWeek').tz('Europe/Berlin').format('YYYY-MM-DD HH:mm:ss');  // Montag
    const endOfLastMonth = dayjs().subtract(1, 'month').endOf('isoWeek').tz('Europe/Berlin').endOf('day').format('YYYY-MM-DD HH:mm:ss');  // Sonntag


    const activeProducts = await Product.count({
        where: {
            is_active: {
                [Op.eq]: true,
            },
        },
    });

    const inactiveProducts = await Product.count({
        where: {
            is_active: {
                [Op.eq]: false,
            },
        },
    });
    



return { data: {activeProducts, inactiveProducts} }

}

module.exports = { getAllOrdersData, getOrderChartData, getTodaysRevenue, getNewCustomersFromThisMonth, getQuantityByCategory };
